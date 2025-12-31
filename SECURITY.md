# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | ✅ |

## Reporting a Vulnerability

If you discover a security vulnerability, please do the following:

### DO NOT

- Open a public issue
- Discuss it in public forums

### DO

1. **Email** the details to: peakk3984@gmail.com
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

- **Initial response**: Within 48 hours
- **Status update**: Within 7 days
- **Fix timeline**: Depends on severity
  - Critical: 1-3 days
  - High: 1-2 weeks
  - Medium: 2-4 weeks

## Security Considerations

This library:
- Has zero external dependencies (reduces supply chain risk)
- Performs only mathematical calculations (no I/O, network, or file operations)
- Validates input data types
- Throws explicit errors for invalid inputs

## Disclosure Policy

Once a vulnerability is fixed:
1. We'll release a patch version
2. Credit the reporter (unless they prefer anonymity)
3. Publish a security advisory on GitHub

Thank you for helping keep Mint Statistics secure!