#this checks node and npm version numbers and verifies it is within project bounds

#!/bin/bash
currentNodeVer="$(node -v)"
currentNPMVer="$(npm -v)"

requiredNodeVerLow="12.0.0"
requiredNodeVerHigh="14.0.0"

requiredNPMVerLow="6.13.0"
requiredNPMVerHigh="6.15.0"

 if [ "$(printf '%s\n' "$currentNodeVer" "$requiredNodeVerLow" | sort -V | head -n1)" = "$currentNodeVer" ]; then 
        echo "Node Version less than the required ${requiredNodeVerLow} (FAIL)"
        exit 1 
 elif [ "$(printf '%s\n' "$currentNodeVer" "$requiredNodeVerHigh" | sort -V | head -n1)" = "$requiredNodeVerHigh" ]; then
        echo "Node Version higher than the required ${requiredNodeVerHigh} (FAIL)"
        exit 1
 elif [ "$(printf '%s\n' "$currentNPMVer" "$requiredNPMVerLow" | sort -V | head -n1)" = "$currentNPMVer" ]; then
        echo "NPM Version lower than the required ${requiredNPMVerLow} (FAIL)"
        exit 1
 elif [ "$(printf '%s\n' "$currentNPMVer" "$requiredNPMVerHigh" | sort -V | head -n1)" = "$requiredNPMVerHigh" ]; then
        echo "NPM Version higher than the required ${requiredNPMVerHigh} (FAIL)"
        exit 1
 else 
        echo "All Node and NPM versions current for project standards (PASS)"
 fi