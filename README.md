
# Helpdesk-in-Sight

Helpdesk-in-Sight is a comprehensive software support ticketing system designed to streamline the process of managing, tracking, and resolving customer or internal support requests in a structured and efficient manner.

![Helpdesk-in-Sight Banner](https://helpdesk-in-sight.lovable.app/banner.png)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [User Roles](#user-roles)
- [Getting Started](#getting-started)
- [User Guide](#user-guide)
  - [End User Features](#end-user-features)
  - [Agent Features](#agent-features)
  - [Admin Features](#admin-features)
- [Integrations](#integrations)
- [Multi-Channel Support](#multi-channel-support)
- [Technical Information](#technical-information)
- [Development](#development)

## Introduction

Helpdesk-in-Sight is a powerful ticketing system that helps organizations manage support requests efficiently. The platform provides a centralized hub for users to submit, track, and resolve issues, along with powerful tools for agents and administrators to manage the support workflow.

## Features

- **Ticket Management**: Create, track, and resolve support tickets
- **Knowledge Base**: Access self-service articles and documentation
- **Agent Workspace**: Dedicated interface for support agents
- **Admin Dashboard**: Comprehensive administrative controls
- **Integration Support**: Connect with CRM, email, and project management tools
- **Multi-Channel Communication**: Support via email, chat, social media, and phone
- **Reporting**: Analyze support performance and metrics

## User Roles

The system supports three main user roles:

1. **Users**: Can create tickets, track their status, and access the knowledge base
2. **Agents**: Can manage and resolve tickets
3. **Admins**: Have full system access including user management and system configuration

## Getting Started

### Accessing the Portal

You can access the Helpdesk-in-Sight portal at [https://helpdesk-in-sight.lovable.app/](https://helpdesk-in-sight.lovable.app/).

### Registration and Login

1. Navigate to the portal URL
2. Click "Register" to create a new account
3. Fill in your details and submit the registration form
4. Once registered, use your credentials to log in

## User Guide

### End User Features

#### Creating a New Ticket

1. Log in to your account
2. Navigate to "Create Ticket" in the navigation menu
3. Fill in the ticket form with:
   - Subject: A clear, concise title for your issue
   - Description: Detailed information about your problem
   - Category: Select the appropriate category for your issue
   - Priority: Indicate the urgency of your request
4. Submit the ticket

#### Tracking Your Tickets

1. Log in to your account
2. Navigate to "Dashboard" to see all your tickets
3. Use filters to sort tickets by status, priority, or date
4. Click on any ticket to view its details and updates

#### Using the Knowledge Base

1. Navigate to "Knowledge Base" in the navigation menu
2. Browse articles by category or use the search function
3. View articles to find solutions for common issues
4. If you can't find a solution, create a ticket for further assistance

### Agent Features

#### Managing Tickets

1. Log in with your agent account
2. Navigate to "Agent Dashboard" to see all assigned tickets
3. Use filters to sort tickets by status, priority, or date
4. Click on any ticket to view and manage it

#### Responding to Tickets

1. Open a ticket from your dashboard
2. Review the ticket details and any attached files
3. Add comments to communicate with the user
4. Use internal notes to communicate with other agents
5. Update the ticket status as appropriate

### Admin Features

#### User Management

1. Log in with your admin account
2. Navigate to "Admin" > "Users"
3. View, add, edit, or disable user accounts
4. Assign roles (user, agent, admin) to accounts

#### Category Management

1. Navigate to "Admin" > "Categories"
2. Create, edit, or disable ticket categories
3. Define category-specific workflows or assignments

#### Knowledge Base Management

1. Navigate to "Admin" > "Knowledge Base"
2. Create, edit, or archive knowledge base articles
3. Organize articles into categories
4. Monitor article views and feedback

#### System Settings

1. Navigate to "Admin" > "Settings"
2. Configure general settings like site name
3. Set up email notifications
4. Configure ticket assignment rules
5. Manage security settings
6. Set up integrations with other tools
7. Configure multi-channel support

## Integrations

Helpdesk-in-Sight can integrate with various external tools to enhance functionality.

### CRM Integration

**Use Case**: Connect your support system to your CRM platform.

**Benefits**:
- Access customer history and purchase information
- View previous interactions across departments
- Create more personalized support experiences

**Setup**:
1. Navigate to "Admin" > "Settings"
2. Go to the "Integration Settings" section
3. Enable "CRM Integration"
4. Save your settings
5. Follow the configuration wizard to connect to your specific CRM

### Email Client Integration

**Use Case**: Connect your support system to your email platform.

**Benefits**:
- Send and receive ticket updates via email
- Import email conversations as tickets
- Maintain communication history in one place

**Setup**:
1. Navigate to "Admin" > "Settings"
2. Go to the "Integration Settings" section
3. Enable "Email Client Integration"
4. Save your settings
5. Configure email server settings as prompted

### Project Management Integration

**Use Case**: Connect your support system to project management tools.

**Benefits**:
- Link tickets to broader project workflows
- Convert complex support requests into development tasks
- Track issue resolution across teams

**Setup**:
1. Navigate to "Admin" > "Settings"
2. Go to the "Integration Settings" section
3. Enable "Project Management Integration"
4. Save your settings
5. Select your project management platform and configure the connection

## Multi-Channel Support

Helpdesk-in-Sight supports various communication channels to meet users where they are.

### Email Support

**Use Case**: Allow users to create and update tickets via email.

**Benefits**:
- Users can create tickets without logging into the portal
- All email communications are captured in the ticket history
- Automatic ticket creation from incoming emails

**Setup**:
1. Navigate to "Admin" > "Settings"
2. Go to the "Multi-Channel Support" section
3. Enable "Email Support"
4. Save your settings
5. Configure the email address that will receive ticket emails

### Live Chat Support

**Use Case**: Provide real-time support via web chat.

**Benefits**:
- Immediate assistance for urgent issues
- Reduce resolution time for simple questions
- Improved user experience

**Setup**:
1. Navigate to "Admin" > "Settings"
2. Go to the "Multi-Channel Support" section
3. Enable "Live Chat Support"
4. Save your settings
5. Configure chat widget appearance and behavior
6. Assign agents to chat support

### Social Media Support

**Use Case**: Monitor and respond to support requests on social platforms.

**Benefits**:
- Capture support requests from social media
- Maintain consistent support across channels
- Improve brand reputation through public resolution

**Setup**:
1. Navigate to "Admin" > "Settings"
2. Go to the "Multi-Channel Support" section
3. Enable "Social Media Support"
4. Save your settings
5. Connect to your social media accounts
6. Configure automatic ticket creation for social mentions

### Phone Support Integration

**Use Case**: Create tickets from phone calls.

**Benefits**:
- Capture all support interactions in one system
- Record call details for future reference
- Track resolution across all communication channels

**Setup**:
1. Navigate to "Admin" > "Settings"
2. Go to the "Multi-Channel Support" section
3. Enable "Phone Support Integration"
4. Save your settings
5. Connect to your phone system (requires compatible VoIP or call center software)

## Technical Information

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Development

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

<!-- need to check Multi-Channel Support
1) there is no email address Configure the for receive ticket emails.
2) there is no real-time support via web chat window.(Configure chat widget appearance and behavior) not displaying 
3) there is no social platforms integration. (Connect to your social media accounts)
4) there is no module and section for Phone Support Integration when it enable.

thus all features  need detail window and integratable detail settings. -->
