# Project Overview

## **Problem Definition**
The goal is to build a foundational annotation system focused on modularity and extensibility. The system is designed to foster collaboration between AI and humans by capturing reviews and observations from AI tools. It should support various annotation methods, such as text comments, notes, and other flexible input forms. This project aims to address the following tasks:

- Task 1: Authentication using Next.js Auth.js to secure user access.
- Task 2: Designing a generic, composite component system described in JSON.
- Task 3: Enabling universal annotation support across all components for research, development, and analysis.

---

## Figma Prototype - [Prototype](https://www.figma.com/design/FjOYDzmsxpnn9Kc1oCAcah/Problem-Prototype?node-id=0-1&t=V4IhUIHnHI60vcI7-1)
---

### **Version 1: Authentication**
- Implement authentication using Next.js Auth.js to secure user access.
- Ensure role-based access control to manage permissions for annotations.

## **Users**
- **Researchers and Analysts**: To annotate data collaboratively with AI systems.
- **Data Scientists**: To analyze AI-generated observations and add context or corrections.
- **Developers**: To integrate and extend the annotation framework for specific use cases.

---

## **Plan**

### **Version 1: Authentication**
- Implement authentication using Next.js Auth.js to secure user access.
- Ensure role-based access control to manage permissions for annotations.

### **Version 1: Generic Component System**
1. **Design Generic Components**
   - Create a system for designing modular and composite components described in JSON.
   - Base Component Structure:
     ```json
     {
       "metadata": {},
       "data": {
         "id": "",
         "type": "",
         "displayType": "",
         "data": [
           [ {}, {} ]
         ]
       }
     }
     ```
   - Metadata defines the component context, while `data` holds hierarchical or tabular data.

2. **Component Types**
   - Develop components to render different data types:
     - **Images**
     - **Graphs**
     - **Gifs**
     - **Text**
     - **Numbers**
   - Build a general component that dynamically decides which specific component to use based on the `displayType` attribute in the JSON data.

3. **Dynamic Registration**
   - Enable dynamic registration of new widget types for future extensibility.

4. **Exit Criteria for Version 1**
   - Render CSV data.
   - Render text data.
   - Display composite widgets.
   - Dynamically register new widget types.

### **Version 1: Annotation Support**
1. **Universal Annotation Component**
   - Implement a universal annotation system that integrates seamlessly with all components.
   - Allow users to add comments, notes, and reviews for any data.
   - Ensure the annotation system supports hierarchical data structures for detailed context.

2. **Interactive Features**
   - Enable annotations to be shared and collaborated on by multiple users.
   - Provide version control for annotations to track changes.

3. **Exit Criteria for Version 1**
   - Universal annotation system available across all components.
   - Annotations can be saved, shared, and versioned.

---

## **Exit Criteria**
1. Secure authentication system using Next.js Auth.js.
2. Fully functional generic component system capable of rendering diverse data types.
3. Dynamic component registration mechanism for extensibility.
4. Annotation support integrated across all components.

---

## **Project Deliverables**
1. **Authentication System**
   - Role-based access control.
   - Secure user authentication and session management.

2. **Component Library**
   - Modular and composite components described via JSON.
   - Dynamically adaptable components for various data types.

3. **Annotation Framework**
   - Universal annotation component.
   - Collaborative annotation support.
   - Version control for annotations.

4. **Documentation**
   - User guide for implementing and extending the annotation system.
   - Developer documentation for dynamic component registration.

---

## **Future Enhancements**
1. Integrate AI-assisted annotation suggestions for faster reviews.
2. Provide export options for annotated data and visualizations.
3. Add multilingual support for annotations and user interface.