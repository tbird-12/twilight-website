# Resume Upload Feature for Careers Page

## Overview
The careers page now includes a robust resume upload feature that allows job applicants to submit their resumes directly from the job posting cards. The feature includes strict client-side validation and a smooth user experience.

## Implementation Details

### Components Created

#### 1. **ResumeUploadForm.tsx** (`src/components/react/forms/ResumeUploadForm.tsx`)
The core React component that handles resume file upload with the following features:
- **File Validation:**
  - PDF files only (checked via MIME type)
  - Maximum file size: 1MB
  - Clear validation error messages
- **User Experience:**
  - Progress feedback during upload
  - Success/error status messages with visual indicators
  - Styled with Tailwind CSS token classes for consistency
- **Error Handling:**
  - Handles network errors gracefully
  - FileReader errors
  - API errors from the backend service

#### 2. **ApplyButton.tsx** (`src/components/react/ApplyButton.tsx`)
A wrapper component that manages the button state and form display:
- Toggles between showing the "Apply Now" button and the resume upload form
- Preserves button styling (solid/outline variants)
- Provides a "Cancel" button to hide the form

#### 3. **ApplyButtonWrapper.astro** (`src/components/ApplyButtonWrapper.astro`)
Astro wrapper that bridges ApplyButton into the Astro page template following the project's wrapper pattern.

#### 4. **ResumeUploadFormWrapper.astro** (`src/components/ResumeUploadFormWrapper.astro`)
Astro wrapper for standalone use of the ResumeUploadForm component.

### Changes to careers.astro
- Added `positionId` field to the `CareerOpening` interface to uniquely identify each position
- Updated all career opening objects to include their `positionId` (e.g., "licensed-clinician", "licensed-psychologist", "doctoral-practicum")
- Replaced the mailto link button with the `ApplyButtonWrapper` component

## Usage

### Configuration
To enable resume uploads, you need to provide the Google Apps Script Web App URL:

```astro
<ApplyButtonWrapper
  position={opening.positionId}
  ctaLabel={opening.ctaLabel}
  ctaVariant={opening.ctaVariant}
  scriptURL="YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL"
/>
```

### Google Apps Script Integration
The form sends POST requests with the following payload:
```json
{
  "fileName": "resume.pdf",
  "mimeType": "application/pdf",
  "fileData": "base64-encoded-file-data",
  "position": "licensed-clinician"
}
```

Your Google Apps Script should:
1. Receive the POST request
2. Decode the base64 file data
3. Save the file to Google Drive with the position name
4. Return a JSON response:
   ```json
   { "status": "success" }
   // or
   { "status": "error", "message": "Error description" }
   ```

## Validation Details

### Client-Side Validation
- **File Type:** Only PDF files (application/pdf MIME type)
- **File Size:** Maximum 1MB
- **User Feedback:** Real-time validation with clear error messages

### File Upload Flow
1. User clicks "Apply Now" button
2. Form expands inline
3. User selects PDF file (browser dialog enforces PDF only)
4. File is immediately validated before upload
5. File is converted to base64 and sent to the backend
6. Success/error message is displayed
7. Form resets on success

## Styling
- Uses Tailwind CSS token classes for consistency with the site theme:
  - `bg-cta`, `text-cta-fg` for primary buttons
  - `text-site-text`, `text-site-sub` for text
  - `bg-green-50`, `bg-red-50`, `bg-blue-50` for status messages
- Dark mode compatible with appropriate contrast
- Responsive design works on mobile and desktop

## Browser Compatibility
- All modern browsers that support:
  - ES6+ JavaScript
  - FileReader API
  - Fetch API
  - CSS Grid and Flexbox

## Testing
The feature has been tested with:
- ✅ TypeScript strict mode (`npm run check`)
- ✅ Vitest unit tests (`npm run test`)
- ✅ Production build (`npm run build`)

## Future Enhancements
- Add drag-and-drop file upload
- Support for additional file formats (DOCX)
- Resume parsing to extract candidate information
- Email notification system
- Resume preview before submission
