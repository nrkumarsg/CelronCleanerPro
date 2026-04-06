# Security & Certification Guide: Celron Cleaner

To ensure your users have a "Virus-Free" experience and to minimize Windows SmartScreen warnings, follow these technical certification steps.

---

## 1. Digital Code Signing (Mandatory)
Windows uses digital signatures to verify the publisher and ensure the code hasn't been modified. An unsigned application will always trigger a "Windows protected your PC" warning.

### Step 1: Obtain a Certificate
Purchase an **EV (Extended Validation) Code Signing Certificate** from a Microsoft-approved Certificate Authority:
- **DigiCert** (Recommended)
- **Sectigo**
- **GlobalSign**

### Step 2: Configure Electron Builder
Once you have your `.pfx` certificate file, add the following to your `package.json` (under the `build` section) or use environment variables:

```json
"build": {
  "win": {
    "certificateFile": "path/to/your/certificate.pfx",
    "certificatePassword": "YOUR_PFX_PASSWORD",
    "signingHashAlgorithms": ["sha256"]
  }
}
```

*Note: For better security, use Environment Variables `CSC_LINK` and `CSC_KEY_PASSWORD` instead of hardcoding in package.json.*

---

## 2. Building "SmartScreen" Reputation
SmartScreen trust is built over time based on the number of successful, clean installations.

1. **Submission to Microsoft:** Upload each release to the [Microsoft Malware Analysis Portal](https://www.microsoft.com/en-us/wdsi/filesubmission). Select "Software Developer" and "Clean" to proactively clear false positives.
2. **Consistent Signing:** Always use the same certificate thumbprint for all releases.

---

## 3. Clearing VirusTotal Flags
If early builds are flagged on VirusTotal:
1. **Analyze:** Identify which AV engine is flagging the file (e.g., Avast, Microsoft, Symantec).
2. **Submit False Positive Report:** Each vendor has an "FP Submission" form. Provide them with your signed binary to have it whitelisted.
3. **Avoid Suspicious Code:** Ensure your cleaner scripts (`del`, `rd`) are clearly identified and don't attempt to modify core Windows system files (`C:\Windows\System32`).

---

## 4. User Trust Design (Already Implemented)
We have added the following to the UI to reinforce safety:
- **Dashboard Badges:** "Verified Secure" and "Malware Free" indicators.
- **Certification Section:** Located in the Help Guide for transparency.
- **Open Source Ready:** The codebase is auditable, which is the highest form of security transparency.

---

**Developed for Celron Enterprises Engineering.**  
*Last Updated: April 2026*
