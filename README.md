# Bloocode Assessment

A web application built with **Next.js 15**, **TailwindCSS**, and **TypeScript**. This project aims to provide a scalable and maintainable structure, with a focus on clean code practices and thorough testing.

## Prerequisites

Before you begin, ensure that you have the following software installed:

- **Node.js** (version 16 or later)
- **npm** or **yarn** package manager

## Getting Started

## How to Run Locally

To run the project locally on your machine, follow these simple steps:

1. **Clone the Repository**: Start by cloning this repository to your local machine using the following command in your terminal:
   `git clone` <repository-url>

2. **Navigate to the Project Directory**: Once cloned, navigate to the project directory using the `cd` command:
   `cd bloocode-assessment`

3. **Open in VS Code**: Open the project directory in your preferred code editor, such as Visual Studio Code:
   `code .`

4. **Install Dependencies**: Before running the project, make sure to install all the required dependencies. Run the following command:
   `npm install` or `yarn install`

5. **Set Up Environment Variables**: To run the project, you need to set up environment variables. Copy the .env.example file to .env. Run the command:
   `cp .env.example .env`

6. **Run the Development Server**: After installing the dependencies, you can start the development server using the following command:
   `npm run dev`

7. **Start Coding**: You're all set! Now you can start coding and making changes to the project.

8. Ensure you stick to best practices and professional guidelines.

9. **Run Tests**: To run the unit tests and ensure that everything is working as expected, use the following command:
   `npm run test`
10. **Build and Start for Production**: To build the project for production and start the application in production mode. Run:
    `npm run build` then `npm run start`

## Directory Structure

```

│
├── /__mocks__                    # Mocks for tests
│  ├── /customFetch.ts
│  ├── /getMoreMovies.ts
│
├── /__tests__                    # Contains test files
│  ├── /Home.test.tsx
│  ├── /MovieGrid.test.tsx
│
│
├── /app
│  ├── /ajax
│  │   ├── /index.ts
│  ├── /components         # Reusable UI components such as favorite button, movie card, etc.
│  │   ├── /Favorite.tsx
│  │   ├── /MovieCard.tsx
│  │   ├── /MovieGrid.tsx
│  │   ├── /Navbar.tsx
│  │   ├── /SearchMovie.tsx
│  │   └── /Spinner.tsx
│  ├── /data               # Static or mock data used across the app
│  │   └── /index.ts
│  ├── /details            # Pages or components for detailed views (e.g., movie details)
│  │   └── /page.tsx       # A detailed view page (e.g., for a specific movie)
│  ├── /favorites          # Page for rendering user favorite stores
│  │   └── /page.tsx
│  ├── /hooks              # Custom hooks for app functionality
│  │   └── /useLocalStorage.ts
│  ├── /icons              # Icons used throughout the app (SVGs in React tsx components)
│  │   └── /Heart.tsx
│  ├── /types              # TypeScript types used across the app
│  │   ├── /index.ts
│  ├── /utils              # Utility functions or helpers used throughout the app
│  │   ├── /index.ts
│
├── .env.example          # Contains non-sensitive reusable secrets
│
├── eslintrc.json
│
├── .gitignore
|
├── jest.config.ts
|
├── mods.d.ts
|
├── next.env.ts
|
├── next.config.ts
|
├── package-lock.json
|
├── package.json
|
├── postcss.config.json
|
├── README.md
|
├── setupTests.ts
|
├── tailwind.config.ts
|
├── tsconfig.json
│
|

```

# Design Decisions and Trade-offs

This section outlines the key design and architectural decisions made during the development of this movie app, including UI choices, technical considerations, and associated trade-offs.

---

## App Directory Structure

- **Decision**: Adopted Next.js 15's App Router structure with a modular directory layout for scalability and maintainability.
- **Trade-off**: This approach introduces a learning curve for developers unfamiliar with the App Router. However, the benefits of co-located files, automatic routing, and improved server-side rendering outweigh this drawback.

## **Tailwind CSS for Styling**

- **Decision**: Utilized Tailwind CSS for utility-first styling. It allows rapid development and reduces the need for writing custom CSS from scratch. It also allows only the used styles which have been specified throughout the project to be bundled hence reducing the build folder size
- **Trade-off**: Tailwind's utility class-heavy approach can make HTML files look cluttered. To mitigate this, components are well-organized, and reusable classes are abstracted when possible.

## **TypeScript for Strong Typing**

- **Decision**: Chose TypeScript to provide static type checking and reduce runtime errors.
- **Trade-off**: Increased initial development time due to stricter syntax and type definitions. However, this ensures better long-term maintainability and fewer bugs. This also facilitates a good developer experience by allowing better readabilty of code and structuring

---

## **UI Design Choices**

### **Homepage with Infinite Scroll**

- **Design Choice**: The homepage features a hero section with a banner, a search component directly below it and a grid layout showcasing a collection of movies. Users can scroll infinitely to load more movies, providing a seamless browsing experience. Also the choice of colors were to still adapt a little to bloocode's color pattern while allowing a dark background throughout the app to provide better UI/UX reducing brightness issues and also having a good feel of the app.
- **Rationale**:
  - A grid layout ensures an intuitive visual hierarchy, allowing users to browse a large number of movies quickly.
  - Infinite scroll eliminates the need for pagination, creating an uninterrupted user experience.
- **Trade-off**: Infinite scroll can increase API load due to frequent data fetching. To mitigate this, caching strategies are implemented to optimize performance.

### **Movie Details Page**

- **Design Choice**: The `/details/[id]` page dynamically renders detailed information about a selected movie, including the title, description, release date, and other metadata.
- **Rationale**:
  - A dedicated details page enhances user engagement by presenting rich, contextual information about a movie.
  - Dynamic routing simplifies handling of unique movie data via the `id` parameter.
- **Trade-off**: Fetching data for individual movies at runtime can introduce slight latency. Prefetching or skeleton loading ensures a better user experience.

### **Favorites Page**

- **Design Choice**: The favorites page allows users to view and manage their favorite movies, stored locally in the browser or synced with an API.
- **Rationale**:
  - Favorites functionality increases user engagement by enabling personalized experiences.
  - Displaying favorites in a list/grid format ensures consistency with the app's overall design.
- **Trade-off**: Handling state management for favorites can add complexity. This is addressed using local storage or Redux for state persistence.

### **Movie Card**

- **Design Choice**: The movie card shows the necessary details for the movie and also has a slide up black overlay on hover which displays a see more button, this navigates to the movie details page. It provides a good UX because it prevents the issue of mistake clicks and also engages the user intuitively with the application.
- **Rationale**:
  - The hover effect enhances the visual hierarchy by distinguishing the interactive area of the card, creating a seamless user experience..
  - By keeping the initial card interface simple and clean while revealing additional interactivity only on hover, the design strikes a balance between minimalism and functionality.
  - Ensuring navigation through the "See More" button helps guide users explicitly to detailed movie information, avoiding unnecessary clicks on non-functional parts of the card.
  - The card's style aligns with the overall aesthetic of the app, maintaining design coherence across different pages and components
- **Trade-off**: The hover interaction may not be fully accessible for touch devices. To address this, the card includes touch-friendly interactive areas, ensuring accessibility for all users

---

## **Dynamic Routing with `/details/[id]`**

- **Decision**: Implemented dynamic routes in the `/details` folder to support unique pages for individual movies.
- **Trade-off**: Fetching data for each `id` at runtime may introduce slight latency, but this is acceptable for the flexibility provided by dynamic routing.

## **Testing with Testing Library**

- **Decision**: Chose Testing Library for unit and integration testing to ensure UI correctness and proper functionality.
- **Trade-off**: While Testing Library is excellent for testing user interactions, it may require additional effort for mocking complex API calls. However, it aligns with our goal of testing user behavior rather than implementation details.

## **Focus on Reusability**

- **Decision**: Organized components in `/@app/components` to encourage reusability (e.g., `Spinner`, `MovieGrid`).
- **Trade-off**: While abstracting reusable components may initially take longer, it significantly reduces redundancy in the long term.

## **Static vs. Dynamic Data**

- **Decision**: Kept static or mock data in `/data` while using dynamic API calls for real-time content.
- **Trade-off**: This hybrid approach ensures quick prototyping with mock data but requires transitioning to dynamic sources for production.

---

By documenting these design and UI choices, I aim to provide a clear understanding of the decisions shaping this project and their implications for functionality, user experience, and maintainability.
