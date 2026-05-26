# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Bump the `node` builder from `6.x` to `7.x` and the local `@types/node` to `20.x`; pin `typescript` to `5.x` to match the toolchain used at link time.
- Provide the missing `RecorderState`/`ParamsContext` type arguments to `Service<Clients>` so the project type-checks under the `7.x` toolchain.
- Refresh the `outbound-access` policy to target `api.vtexinternal.com` `/api/vtexid/credential/validate`.
- Authenticate users against `POST /api/vtexid/credential/validate`, replacing the legacy `GET /pub/authenticated/user` call.
- Accept the `VtexIdclientAutCookie` credential via HTTP header in addition to the cookie.

### Security
- Reject tokens whose audience is not `admin` so the IDE cannot be reached with storefront-audience credentials.
- Strip `VtexIdclientAutCookie_*` cookies from the request before proxying it to `vtex.graphql-server`.

## [3.8.2-beta] - 2026-05-20

### Changed
- Release bump only; no functional changes over 3.8.1-beta.

## [3.8.1-beta] - 2026-05-20

### Fixed
- Pass the account name (`an`) when calling VTEX ID `/pub/authenticated/user`, unblocking cross-account checks until the canonical `credential/validate` migration lands.

### Changed
- Bump the `node` builder from `4.x` to `6.x`.

## [3.8.0] - 2025-01-06

### Added
- Polish translation

## [3.7.0] - 2023-03-27

### Added
- German translation.

## [3.6.2] - 2022-09-29

### Fixed

- English, Italian and Portuguese translation

## [3.6.1] - 2022-08-08

### Fixed

- Raise timeout
- Tooling & linting

## [3.6.0] - 2021-11-17

### Added

- Arabic and Spanish translation.

## [3.5.0] - 2021-09-20

### Added

- I18n Bg.

## [3.4.1] - 2021-09-09

### Added

- I18n pseudo language to implement In Context tool.

### Fixed

- I18n Es.

## [3.4.0] - 2021-05-03

### Added

- I18n, Fr, It, Kr and Nl.

### Changed

- Crowdin configuration file.

## [3.3.0] - 2021-03-04

### Added

- I18n Jp.

## [3.2.1] - 2021-01-29

### Added

- AdminV4 support.

## [3.2.0] - 2020-12-11

### Added

- I18n Ro.
- Crowdin configuration file.


[Unreleased]: https://github.com/vtex-apps/admin-graphql-ide/compare/v3.8.2-beta...HEAD
[3.8.2-beta]: https://github.com/vtex-apps/admin-graphql-ide/compare/v3.8.1-beta...v3.8.2-beta
[3.8.1-beta]: https://github.com/vtex-apps/admin-graphql-ide/compare/v3.8.0...v3.8.1-beta