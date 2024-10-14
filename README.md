# S3Reactor  🚀

<img width="1722" alt="s3_bucket_deploy" src="https://github.com/user-attachments/assets/9fb795cf-1303-4ae9-8eb8-f42cf633617d">

## Project Overview

**S3Reactor** is a fully automated solution for deploying a static React web application to an AWS S3 bucket. The process leverages **GitHub Actions** for Continuous Integration and Deployment (CI/CD). This repository includes all the configurations needed to automatically deploy the application whenever changes are pushed to the `master` branch.

### Key Technologies 🛠️
- **React**: JavaScript library for building the static web app.
- **AWS S3**: Amazon's Simple Storage Service to host the static website.
- **GitHub Actions**: CI/CD platform for automating the build and deployment process.
- **AWS IAM**: Used for securely managing access to AWS resources.
- **Ubuntu GitHub Runner**: The environment for running the CI/CD jobs.

## Features ✨

- **Automated Build and Deployment**: The project uses GitHub Actions to automatically build and deploy the React app to an AWS S3 bucket on each push to the `master` branch.
- **Static Web Hosting**: The AWS S3 bucket is configured to host a static website.
- **IAM-based Secure Access**: AWS Identity and Access Management (IAM) is used to handle secure access to the S3 bucket for deployments.
- **Public Access Configuration**: The S3 bucket is configured with a public access policy for serving the web app.

## Architecture Overview 🏗️

The process flow is as follows:
1. **Developer Pushes Code**: Commits pushed to the GitHub repository trigger the GitHub Actions pipeline.
2. **GitHub Actions Pipeline**:
   - Checkout the latest code from the repository.
   - Set up the Node.js environment to build the React application.
   - Install necessary dependencies and build the React app for production.
   - Authenticate with AWS using IAM credentials stored securely in GitHub Secrets 🔒.
   - Deploy the built React app to the S3 bucket.
3. **AWS S3**: The S3 bucket is configured for static web hosting and serves the React app.
4. **User Access**: Users can access the deployed React app using the S3 bucket's public URL.

## CI/CD Workflow with GitHub Actions 🔄

Below is the **GitHub Actions** workflow configuration that automates the build and deployment process:

### 1. **Checkout Code** 📥
This step uses the `actions/checkout@v4` action to clone the repository into the GitHub runner's environment. It allows the workflow to access the source code to be built and deployed.

```yaml
- name: Checkout Code
  uses: actions/checkout@v4
```

### 2. **Setup NodeJS** 🖥️
In this step, Node.js is set up in the GitHub runner environment using `actions/setup-node@v4`. The `node-version: 20` specifies that Node.js version 20 is installed. This step is essential for building your React application using Node.js tools.

```yaml
- name: Setup NodeJS
  uses: actions/setup-node@v4
  with:
    node-version: 20
```

### 3. **Install Dependencies** 📦
The command `npm install` is used here to install all project dependencies as defined in the `package.json` file. This is necessary before building the React application.

```yaml
- name: Install Dependencies
  run: npm install
```

### 4. **AWS Authentication Configuration** 🛡️
Here, we configure AWS credentials using the `aws-actions/configure-aws-credentials@v4` action. It authenticates the GitHub runner with AWS by providing the necessary credentials from GitHub Secrets. It uses the access key, secret key, and region defined in the repository’s secrets for security purposes.

```yaml
- name: AWS Auth Config Credentials
  uses: aws-actions/configure-aws-credentials@v4
  with:
    aws-access-key-id: ${{secrets.AWS_ACCESS_KEY_ID}}
    aws-secret-access-key: ${{secrets.AWS_SECRET_ACCESS_KEY}}
    aws-region: ${{secrets.AWS_REGION}}
```

This is necessary to allow the GitHub Actions runner to perform operations on your AWS account, such as uploading to an S3 bucket.

### 5. **Deploy to S3 Bucket** ☁️
The `aws s3 sync` command is used to sync the local `build` folder (where the built React app is stored) with the specified S3 bucket. The `--delete` flag ensures that files that no longer exist in the local `build` folder are deleted from the S3 bucket, ensuring consistency.

```yaml
- name: Deploy to S3 Bucket
  run: aws s3 sync build s3://{{secrets.AWS_S3_BUCKET_NAME}} --delete
```

This step effectively deploys your React application to AWS S3, making it publicly accessible based on your S3 bucket’s policy.

## IAM Key Generation for AWS Access 🔑
To set up the AWS credentials required for this deployment, follow these steps:

1. **Sign in to AWS Management Console**: Go to https://aws.amazon.com/console/.
2. **Navigate to IAM**: Search for "IAM" in the services search bar and go to the Identity and Access Management (IAM) service.
3. **Create a New IAM User**:
    - Go to "Users" and click "Add user."
    - Choose a username (e.g., `github-actions-deployer`).
    - Select "Programmatic access" to generate an access key for this user.
4. **Set Permissions**:
    - Choose "Attach existing policies directly."
    - Attach the `AmazonS3FullAccess` policy to allow this user full access to S3.
5. **Generate Keys**:
    - Once the user is created, download or copy the **Access Key ID** and **Secret Access Key**.
    - These will be used as the `${{ secrets.AWS_ACCESS_KEY_ID }}` and `${{ secrets.AWS_SECRET_ACCESS_KEY }}` in GitHub Secrets.

## Bucket Policy for Public Access 🌍
To allow public access to the S3 bucket where your React app is hosted, you’ll need to set the appropriate bucket policy. Here’s how to do that:

1. **Open the S3 Console**: Navigate to the S3 service in your AWS console.
2. **Select Your Bucket**: Choose the bucket you want to host your React app.
3. **Permissions**: Go to the "Permissions" tab and scroll down to "Bucket policy."
4. **Set the Following Policy**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

Replace `YOUR-BUCKET-NAME` with the actual name of your bucket. This policy allows public read access to all objects in your bucket, which is necessary for hosting static websites.

Make sure to save the policy, and now your S3 bucket is publicly accessible.

## Note 🔒

Currently, **S3Reactor** application is deployed to an AWS S3 bucket configured for static web hosting. However, this setup only supports HTTP access, which is not secure. To enhance security and ensure all data is transmitted over HTTPS, consider integrating **AWS CloudFront** ☁️.


### Why HTTPS is Important ✅

- **Data Security**: HTTPS encrypts data transmitted between the client and the server, protecting sensitive information 🔑.
- **User Trust**: Modern web browsers warn users about unsecured HTTP connections, potentially reducing user trust in your application 🤔.
- **SEO Benefits**: Search engines prefer HTTPS sites, which can improve your site's search ranking 📈.


### Benefits of Using CloudFront 🌟

- **Automatic HTTPS**: CloudFront automatically provides HTTPS access, improving the security of your application 🛡️.
- **Global Content Delivery**: CloudFront caches your content at edge locations worldwide, reducing latency and improving load times for users 🚀.
- **Custom Domain Support**: You can use a custom domain name with CloudFront while leveraging HTTPS 🏷️.

### Integrating AWS CloudFront for HTTPS 🔗

To enable HTTPS for your application, you can follow these below link to AWS CloudFront:

```json

"https://aws.amazon.com/cloudfront/"

```



