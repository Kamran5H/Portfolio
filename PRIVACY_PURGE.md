# Public assets and privacy

The deployed portfolio is a static site. Everything in public/ is publicly downloadable.

Keep identity scans, transcripts, degree scans, private research coordinates, and credentials outside public/. The ignored private_upload/ and scratch/ directories are local staging areas, not secure remote storage.

The document request dialog only prepares an email. It does not verify visitors, provide access control, send messages, or watermark files. Review requests and decide what to share outside the website.

The public CV PDF was rewritten for professional use on 18 October 2026. The prior PDF and editable DOCX were archived in ignored scratch/original-cv/. The DOCX is no longer in the current public export.

Git history can retain previously committed files. Removing a file from the current export does not remove historic copies or invalidate already-downloaded copies. No history rewrite or credential rotation was performed during this update.

For any discovered credential exposure, rotate the credential at its issuer first, then separately plan a coordinated history cleanup. Do not force-push or rewrite shared history as a routine deployment step.
