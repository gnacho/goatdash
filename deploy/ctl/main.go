// goatdash-ctl: tiny control endpoint for the GoatDash static site.
//
// POST /update with header "X-Update-Token: <token>" runs the weekly update
// service (download latest release, checksum, backup, atomic swap) and
// returns the version.json of the install dir once it finishes.
//
// The token comes from the environment (EnvironmentFile in the unit); it is
// entered once per browser in the app's settings and sent as a header, so it
// never travels in the URL and is not stored server-side beyond the env file.
package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"os/exec"
	"strings"
	"time"
)

const versionPath = "/opt/goatcounter-dashboard/public/version.json"

func main() {
	token := os.Getenv("GOATDASH_UPDATE_TOKEN")
	if token == "" {
		log.Fatal("GOATDASH_UPDATE_TOKEN is not set")
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/update", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			writeJSON(w, map[string]any{"ok": false, "error": "method not allowed"})
			return
		}
		if r.Header.Get("X-Update-Token") != token {
			w.WriteHeader(http.StatusUnauthorized)
			writeJSON(w, map[string]any{"ok": false, "error": "unauthorized"})
			return
		}

		// systemctl start on a Type=oneshot unit blocks until the script
		// finishes, so this applies the update synchronously.
		cmd := exec.Command("systemctl", "start", "goatdash-update.service")
		out, err := cmd.CombinedOutput()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			writeJSON(w, map[string]any{"ok": false, "error": strings.TrimSpace(string(out))})
			return
		}
		writeJSON(w, map[string]any{"ok": true, "version": readVersion()})
	})

	srv := &http.Server{
		Addr:              "127.0.0.1:8371",
		Handler:           mux,
		ReadHeaderTimeout: 10 * time.Second,
	}
	log.Fatal(srv.ListenAndServe())
}

func readVersion() string {
	b, err := os.ReadFile(versionPath)
	if err != nil {
		return ""
	}
	var v struct {
		Version string `json:"version"`
	}
	if json.Unmarshal(b, &v) != nil {
		return ""
	}
	return v.Version
}

func writeJSON(w http.ResponseWriter, v map[string]any) {
	enc := json.NewEncoder(w)
	_ = enc.Encode(v)
}
