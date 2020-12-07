#this checks vscode version number and verifies greater than minimum version for project

#!/bin/bash
currentVSCodeVer="$(code -v)"

requiredVSCodeVerLow="10.0.0"

 if [ "$(printf '%s\n' "$currentVSCodeVer" "$requiredVSCodeVerLow" | sort -V | head -n1)" = "$requiredVSCodeVerLow" ]; then 
        echo "Node Version less than the required ${requiredNodeVerLow} (FAIL)"
        exit 1 
 else 
        echo "VS Code version current for project standards (PASS)"
 fi