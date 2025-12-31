# Contributing to Mint Statistics

Thanks for your interest in contributing! We welcome contributions from everyone.

## How to Contribute

### Reporting Bugs

Before creating a bug report:
- Check if the issue already exists
- Use the bug report template
- Include code samples and expected vs actual results

### Suggesting Features

- Use the feature request template
- Explain the use case clearly
- Consider if it fits the library's scope (lightweight, fast statistics)

### Pull Requests

1. **Fork and clone** the repository
3. **Make your changes**:
   - Write clear, commented code
   - Follow the existing code style
   - Add tests if applicable
4. **Test your changes**: `npm run build`
5. **Commit**: Use clear commit messages
6. **Push** and create a pull request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/peakk2011/mintstats.git
cd mintstats

# Install dependencies
npm install

# Build
npm run build

# Run benchmarks (optional)
node dist/benchmarks/median.bench.js
```

### Code Guidelines

- Use TypeScript
- Maintain type safety
- Keep functions pure when possible
- Optimize for performance
- Write clear JSDoc comments
- No external dependencies

### Testing

Before submitting:
- Ensure TypeScript compiles without errors
- Test with both number arrays and object arrays
- Verify edge cases (empty arrays, single values, etc.)

## Code of Conduct

Be respectful, inclusive, and constructive. We're all here to make this library better.

## Questions?

Feel free to open an issue for discussion or reach out to the maintainers.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.