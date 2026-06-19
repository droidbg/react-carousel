# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security bugs seriously. We appreciate your efforts to responsibly disclose your findings, and will make every effort to acknowledge your contributions.

### How to Report a Security Vulnerability

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via one of the following methods:
 
1. **GitHub Security Advisories**: Use GitHub's private vulnerability reporting feature
2. **Direct Message**: Contact the maintainers through GitHub

### What to Include

When reporting a vulnerability, please include:

- **Description**: A clear description of the vulnerability
- **Steps to reproduce**: Detailed steps to reproduce the issue
- **Impact**: Potential impact of the vulnerability
- **Environment**: Affected versions, operating systems, browsers
- **Proof of concept**: If applicable, a minimal proof of concept
- **Suggested fix**: If you have ideas for how to fix the issue

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution**: As quickly as possible, typically within 30 days

### Security Best Practices

#### For Users

- **Keep dependencies updated**: Regularly update your dependencies
- **Use environment variables**: Never commit API keys or secrets to version control
- **Validate inputs**: Always validate user inputs on both client and server
- **Use HTTPS**: Always use HTTPS in production
- **Regular backups**: Keep regular backups of your data

#### For Developers

- **Input validation**: Validate all inputs on both client and server side
- **Authentication**: Implement proper authentication and authorization
- **Rate limiting**: Implement rate limiting to prevent abuse
- **Error handling**: Don't expose sensitive information in error messages
- **Dependencies**: Regularly audit and update dependencies
- **Security headers**: Use appropriate security headers

### Security Considerations

#### API Key Management

- API keys are stored securely in the user's browser local storage
- Keys are obfuscated using simple XOR encryption (not cryptographically secure)
- Users can use their own API keys to bypass server limitations
- Server API keys should be kept secure and not exposed in client-side code

#### Data Privacy

- Conversations are not stored on our servers when using user API keys
- When using server API keys, conversations may be logged for debugging
- No personal data is collected or stored beyond what's necessary for functionality

#### Network Security

- All API communications use HTTPS
- CORS is properly configured
- Rate limiting is recommended for production deployments

### Known Security Considerations

1. **Local Storage**: API keys are stored in browser local storage, which is accessible to any script on the domain
2. **XOR Obfuscation**: The current obfuscation method is not cryptographically secure
3. **No Authentication**: The application doesn't implement user authentication
4. **Rate Limiting**: No built-in rate limiting (should be implemented at the server level)

### Security Updates

Security updates will be released as soon as possible after a vulnerability is confirmed and fixed. We will:

- Release a new version with the fix
- Update the changelog with security information
- Notify users through GitHub releases
- Credit security researchers who responsibly disclose vulnerabilities

### Security Contact

For security-related questions or to report vulnerabilities:

- **GitHub**: Use private vulnerability reporting
- **Email**: [security@echoai.dev] (if available)
- **Issues**: Use GitHub issues for general security questions (not vulnerabilities)

### Acknowledgments

We appreciate the security research community and welcome responsible disclosure of security vulnerabilities. Contributors who help improve the security of EchoAI will be acknowledged in our security hall of fame.

### Legal

This security policy is provided for informational purposes only. By using EchoAI, you agree to use it responsibly and in accordance with applicable laws and regulations.
