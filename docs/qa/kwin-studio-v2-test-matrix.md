# Kwin Studio V2 Test Matrix

Automated source gates:
- required routes exist
- unique metadata per route
- primary navigation resolves to real files
- concept work labels present
- no fake proof claims
- contact qualification fields present
- contact does not report fake success
- 404 exists
- robots/sitemap/manifest exist
- homepage keeps one H1, one shared scroll listener, one shared resize listener and reduced-motion support

Rendered QA still required before merge:
- 320 / 375 / 390 / 430 px
- tablet portrait + landscape
- 1366 / 1440 / large desktop
- keyboard navigation
- menu focus loop + Escape
- deep-route refresh/back-forward
- reduced-motion
- console errors
- form validation and honest blocked-delivery state
