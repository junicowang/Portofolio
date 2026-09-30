# Junico - Data Science Portfolio

Personal portfolio website. Static site, no build step required.

## File structure

```
index.html                -> the main page (loads everything below)
assets/
  style.css               -> all visual styling
  photo.jpg               -> hero photo
  certs/                  -> competition certificates (opens in a modal)
app.js                    -> render engine (usually no need to touch)
data/
  01-profile.js           -> name, bio, email, WhatsApp, GitHub, LinkedIn, CV URL, photo
  03-education.js         -> education
  04-skills.js            -> skills grouped by category
  05-projects.js          -> featured projects (main section)
  06-experience.js        -> experience & activities (timeline)
  07-competitions.js      -> competitions & awards
```

## How to edit content

Everything the visitor reads lives inside the `/data` folder. Open the file for
the section you want to change, edit the JavaScript object, save the file, and
refresh the browser. You never need to touch the design or the render engine.

Examples:
- Add a new project -> add an object to the array in `data/05-projects.js`.
- Update the CV download link -> set `cvUrl` in `data/01-profile.js`.
- Add a new competition -> add an object to `data/07-competitions.js` and (optional) drop the certificate image into `assets/certs/`.

## How to run locally

Just double click `index.html`. The site needs internet access to load the
Google Fonts. If you want the best local development experience, install VS Code
plus the "Live Server" extension and click "Go Live" on `index.html`.

## How to publish it as a public website

Three easy options, ranked by how professional they feel:

### Option 1 (recommended for a data professional): GitHub Pages

1. Create a free account on github.com if you do not have one.
2. Click the **+** icon at the top right and pick **New repository**.
3. Name the repository exactly `junicowang.github.io` (must match your GitHub username).
4. Leave everything else default. Click **Create repository**.
5. On the new empty repo page, click **uploading an existing file**.
6. Drag every file and folder from this `portfolio` folder into the upload area (`index.html`, `app.js`, `assets/`, `data/`, `README.md`).
7. Scroll down and click **Commit changes**.
8. Wait about 1 minute. Your site is now live at `https://junicowang.github.io`.

Whenever you edit a file later, upload the new version to the same repo and the site auto updates.

### Option 2 (fastest, no coding accounts): Netlify Drop

1. Open netlify.com/drop in your browser.
2. Drag the entire `portfolio` folder onto the page.
3. You will get a random URL like `https://something-random-12345.netlify.app`. It is live immediately.
4. Sign up (free) to keep the URL permanently and to change the name to something nicer like `junico.netlify.app`.

### Option 3: Vercel

Similar to Netlify. Sign up at vercel.com, click **New Project**, upload the folder. You get a URL like `junico.vercel.app`.

## After the site is live

- Add the URL to your CV header (I can regenerate the CV for you with the URL added).
- Add the URL to your LinkedIn profile under "Featured" or in the "About" section.
- Include the URL in every internship application email.

## License

Personal portfolio, all rights reserved.
