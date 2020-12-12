#this checks vscode version number and verifies greater than minimum version for project

#!/bin/bash
currentVSCodeVer="$(code -v)"

requiredVSCodeVerLow="1.29.0"

 if [ "$(printf '%s\n' "$currentVSCodeVer" "$requiredVSCodeVerLow" | sort -V | head -n1)" = "$currentVSCodeVer" ]; then 
        echo "vscode Version less than the required ${requiredNodeVerLow} (FAIL)"
        exit 1 
 else 
        echo "VS Code version current for project standards (PASS)"
 fi