# Honey Pot

This is a Honey Pot application designed to lure attackers and monitor their activities.

## Getting Started

To start the application, run the following command:

```bash
make start
```

The application will be accessible at [http://localhost:80](http://localhost:80).

## The Scenario

1.  **Login**: The application opens a login page. The credentials are `admin` / `admin`.
2.  **Dashboard**: Once logged in, the attacker sees a dashboard that appears to contain sensitive database information.
3.  **Reconnaissance**: The attacker will likely analyze network traffic and API calls.
4.  **Vulnerability**: They will discover a suspicious API call: `/api/shell?information=whoami`.
    - This endpoint provides unlimited access to the shell as `root`.

## Monitoring & Logging

We log every action the attacker takes. You can view these logs live by running:

```bash
make logs
```

**What is logged:**

- **Timestamp**: The time when the action was performed.
- **User IP Address**: The IP address of the user who performed the action.
- **User User Agent**: The user agent of the user who performed the action.
- **Shell Commands**: All commands executed via the vulnerable `/api/shell` endpoint.
- **API Status**: API response status.
- **API Activity**: All other API calls.
- **Authentication**: Failed login attempts, allowing you to observe brute-force methods.

## Security Architecture

Despite the intentional vulnerabilities, the application maintains some security measures:

- **Input Validation**: Inputs are secured with Zod schemas.
- **Data Protection**: Passwords are hashed in the database.
- **Architecture**: No middleware (or proxies in Next.js 16) are used, limiting the attack surface to the specific intentional vulnerabilities.
