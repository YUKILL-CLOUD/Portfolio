# How to Deploy Your Portfolio

The easiest way to deploy your Next.js portfolio is to use **Vercel** (the creators of Next.js). It's free for personal projects and extremely fast.

## Option 1: Deploy via GitHub (Recommended)

1.  **Create a GitHub Repository**
    *   Go to [GitHub.com](https://github.com) and create a new repository (e.g., `my-portfolio`).

2.  **Push Your Code**
    *   Open your terminal in the project folder and run:
        ```bash
        git init
        git add 
        git commit -m "Initial commit"
        git branch -M main
        git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
        git push -u origin main
        ```
    *   *(Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual details)*

3.  **Connect to Vercel**
    *   Go to [Vercel.com](https://vercel.com) and sign up/login (you can use your GitHub account).
    *   Click **"Add New..."** -> **"Project"**.
    *   Find your `my-portfolio` repository in the list and click **"Import"**.
    *   Click **"Deploy"**.

Vercel will automatically build your site and give you a live URL (e.g., `paul-bartolo-portfolio.vercel.app`).

## Option 2: Deploy via Netlify (Alternative)

1.  Go to [Netlify.com](https://netlify.com) and sign up.
2.  Drag and drop your `out` folder (if using static export) OR connect your GitHub repository similar to Vercel.

## Important Note

Since you are using `next/image` for optimized images, Vercel is the best choice as it handles image optimization automatically without extra configuration.
