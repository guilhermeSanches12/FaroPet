# Faro Pet Development Guidelines

## Project Context

Faro Pet is a pet health care platform focused on helping pet owners manage vaccines, appointments, health records, and recommended care routines for their pets.

The platform should feel trustworthy, organized, friendly, and professional. It must look like a serious health care app for pets, not a playful or overly childish interface.

The main goal is to provide a clear, useful, and intuitive experience for tutors who need to track their pets’ health information.

---

# General Development Guidelines

- Build the platform using a mobile-first approach, but ensure that all screens are fully responsive and well-structured on desktop and tablet as well.
- Do not create layouts that only work on mobile. Desktop views must feel intentional, organized, and proportional.
- Prioritize clean, reusable, and maintainable code.
- Keep components small and focused. Avoid large files with too many responsibilities.
- Use semantic HTML whenever possible.
- Use clear and descriptive naming for components, variables, functions, and CSS classes.
- Refactor duplicated logic into reusable helper functions or components.
- Avoid unnecessary complexity. The interface should be simple, useful, and easy to understand.
- Do not use emojis anywhere in the interface.
- Use icons from Flaticon or similar clean icon libraries instead of emojis.
- Avoid excessive blur effects, heavy shadows, glassmorphism, or overly decorative UI elements.
- Prioritize accessibility, readability, spacing, contrast, and clear navigation.
- Forms must have clear labels, placeholders, validations, and error messages.
- Every interactive element must provide clear visual feedback.

---

# Technology Guidelines

- Initially build the project using HTML, JavaScript, and Tailwind CSS.
- Use Tailwind utility classes to keep styling consistent and responsive.
- Use flexbox and CSS grid for layout structure.
- Avoid absolute positioning unless strictly necessary.
- Do not hardcode repeated values unnecessarily. Use reusable constants when possible.
- Keep JavaScript organized and separated by responsibility.
- Use progressive enhancement: the platform should remain usable, even if some advanced visual effects are removed.
- Make sure the final code is easy to migrate later to React if needed.

---

# Responsiveness Guidelines

## Mobile

- Mobile is the primary experience.
- Use a clean vertical layout with clear content hierarchy.
- Navigation must be simple, accessible, and easy to use with one hand.
- Buttons and touch targets must be large enough for mobile interaction.
- Avoid dense sections with too much information in a small space.
- Use cards, sections, and spacing to separate information clearly.

## Tablet

- Tablet layouts should use more horizontal space when appropriate.
- Avoid simply stretching the mobile layout.
- Use two-column layouts where they improve readability.

## Desktop

- Desktop layouts must feel complete and intentional.
- Use larger containers, grids, and side-by-side sections when appropriate.
- Avoid leaving excessive empty space.
- Do not make cards or forms too wide.
- Keep the content centered and visually balanced.
- Navigation should feel like a structured web platform, not just an enlarged mobile app.

---

# Visual Identity Guidelines

## Colors

Preserve the existing Faro Pet color palette.

Main color direction:

- Orange tones
- Brown tones
- Beige tones
- White
- Soft neutral backgrounds

Use colors with purpose:

- Orange should be used for primary actions, highlights, and important accents.
- Brown should be used for text emphasis, headings, and brand warmth.
- Beige should be used for soft backgrounds and cards.
- White should be used to create clean, readable sections.
- Avoid using too many saturated colors outside the defined palette.

## Typography

- Use Inter as the main font family.
- Maintain strong typographic hierarchy.
- Headings should be clear and visually distinct.
- Body text must be readable and not too small.
- Avoid using too many different font sizes.
- Use font weight intentionally to guide attention.

## Visual Style

- The layout should feel organic, soft, clean, and friendly.
- The app should look beautiful, but still serious and trustworthy.
- Avoid childish, messy, or overly playful visuals.
- Avoid visual clutter.
- Use consistent border radius, spacing, cards, and section patterns.
- Use soft shadows only when they improve hierarchy.
- Do not overuse decorative elements.

---

# UX Guidelines

## Main Experience

- The user should always understand where they are and what they need to do next.
- Navigation must be clear, predictable, and easy to follow.
- Important actions should be visually prominent.
- Secondary actions should not compete with primary actions.
- Avoid overwhelming the user with too much information at once.
- Use clear empty states when there is no data.
- Use friendly but professional microcopy.
- Avoid technical terms when communicating with pet owners.

## Onboarding Flow

- The welcome/onboarding trail must introduce the purpose of the platform clearly.
- After the user completes the welcome/onboarding flow, they must be redirected to the login screen.
- The login screen must include a clear option to create a new account.
- The onboarding should not be too long or visually confusing.
- Use simple screens with clear messaging and one main action per step.

## Authentication

- The login screen must be clean, focused, and trustworthy.
- The register option must be easy to find.
- Use clear labels for email, password, and account creation fields.
- Error messages must be simple and helpful.
- Avoid cluttering the authentication screens with too many decorative elements.

---

# Navigation Guidelines

- Internal app navigation must be completely organized and visually clean.
- The navigation should make the app feel like a serious pet health care platform.
- Avoid messy layouts, excessive cards, repeated buttons, or unclear sections.
- The main areas of the app should be easy to access, such as:
  - Home / Dashboard
  - My Pets
  - Vaccines
  - Appointments
  - Health Records
  - Profile / Settings

- On mobile, prefer a bottom navigation bar with a limited number of main items.
- On desktop, consider a sidebar or top navigation depending on the layout.
- Do not overload the navigation with too many options.
- Group related features logically.

---

# Pet Profile Guidelines

The pet profile is one of the most important areas of the platform.

## Layout

- The pet photo must be visually prominent.
- The animal image should occupy a meaningful amount of space.
- The photo should not look like a small avatar only.
- Use a clean layout where the image has strong visual presence and the pet information is organized around it.
- On mobile, the photo can appear at the top with the information below it.
- On desktop, consider a two-column layout with the pet photo on one side and structured information on the other.

## Required Information

The pet profile should clearly display:

- Pet name
- Pet photo
- Species
- Breed
- Age
- Gender
- Weight, if available
- Health status or important notes
- Vaccine history
- Upcoming vaccines
- Appointment history
- Upcoming appointments
- Recommended care

## Design

- Use structured cards or sections to separate information.
- Do not place all information in a single dense block.
- Make health-related information easy to scan.
- Highlight urgent or upcoming care items clearly.
- Keep the layout calm, clean, and trustworthy.

---

# Vaccine and Health Record Guidelines

- Vaccine information must be easy to understand.
- Clearly separate completed vaccines from pending or upcoming vaccines.
- Use status labels such as:
  - Completed
  - Upcoming
  - Overdue
  - Pending confirmation

- Avoid confusing terminology.
- Dates must be displayed clearly.
- Health records should be organized chronologically when possible.
- Use visual hierarchy to highlight upcoming or overdue care.
- Do not use alarming colors excessively. Use warning colors only when necessary.

---

# Components Guidelines

## Buttons

### Primary Button

- Use for the main action on the screen.
- Use the primary orange color.
- Only one primary action should dominate each section.
- Labels must be direct and action-oriented.

Examples:

- Add Pet
- Save Information
- Continue
- Schedule Appointment

### Secondary Button

- Use for alternative or supporting actions.
- Use outline or subtle styling.
- Should not compete visually with the primary button.

### Tertiary Button

- Use for low-priority actions.
- Text-only or very subtle style.
- Use sparingly.

---

## Cards

- Use cards to organize information into clear sections.
- Cards should have consistent padding, border radius, and spacing.
- Avoid too many cards stacked without hierarchy.
- Each card should have a clear purpose.
- Do not overload cards with unrelated information.

---

## Forms

- Forms must be simple, organized, and easy to complete.
- Group related fields together.
- Use clear labels above inputs.
- Place validation messages close to the related field.
- Avoid long forms when possible.
- Break complex flows into steps if needed.
- Required fields must be visually clear.

---

## Icons

- Use clean, consistent icons from Flaticon or a similar icon library.
- Icons must support meaning, not replace important text.
- Do not use emojis as icons.
- Keep icon sizes consistent.
- Avoid mixing too many icon styles.

---

# Content Guidelines

- Use clear, friendly, and professional language.
- Avoid overly playful or childish text.
- Avoid technical medical terms unless necessary.
- When technical terms are used, provide simple explanations.
- Keep texts short and helpful.
- Button labels must be clear and action-based.
- Empty states should guide the user toward the next action.

Example empty state:

"No vaccines registered yet. Add your pet’s vaccine history to start tracking upcoming care."

---

# Accessibility Guidelines

- Maintain good color contrast between text and background.
- Do not rely only on color to communicate status.
- Use readable font sizes.
- Buttons and clickable areas must be large enough for touch interaction.
- Inputs must have labels.
- Images must include meaningful alt text.
- Navigation must be keyboard-friendly when possible.
- Focus states must be visible.
- Avoid animations that may distract or reduce usability.

---

# Layout Guidelines

- Use consistent spacing across all screens.
- Avoid crowded sections.
- Prioritize visual hierarchy.
- Use whitespace intentionally.
- Keep content aligned.
- Use grid and flex layouts instead of manual positioning.
- Avoid inconsistent card sizes unless there is a clear reason.
- Keep the design balanced between visual appeal and usability.

---

# Do Not Do

- Do not use emojis.
- Do not create cluttered screens.
- Do not rely only on mobile layout for desktop.
- Do not use excessive blur effects.
- Do not use random colors outside the defined palette.
- Do not make the pet photo too small in the profile area.
- Do not hide important health information.
- Do not use confusing labels for vaccine or appointment status.
- Do not create overly playful visuals that reduce trust.
- Do not use absolute positioning as the main layout strategy.
- Do not overload the dashboard with too much information.

---

# Final Quality Checklist

Before finishing any implementation, verify that:

- The screen works on mobile, tablet, and desktop.
- The layout is organized and visually balanced.
- The interface follows the Faro Pet color palette.
- No emojis are used.
- Icons are clean and consistent.
- The pet health care purpose is clear.
- The navigation is simple and intuitive.
- The pet profile gives strong emphasis to the animal photo.
- Forms are clear and usable.
- The onboarding flow redirects to login after completion.
- The login screen includes an option to create an account.
- The design feels serious, trustworthy, friendly, and useful.
- The code is clean, maintainable, and easy to extend.
