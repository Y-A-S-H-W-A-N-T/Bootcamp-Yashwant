# Project Overview

## **Description**
This project is a science/biology tech application designed for scientists to analyze biological structures and their properties using 3D visualization. It integrates **Mol* (Molstar)** for 3D representation. The goal is to provide an interactive platform for scientists to examine various biological entities, such as proteins, antibodies, or other structures, and their properties in detail.

---

## **Features**
1. **Data Representation**
   - Fetch properties and readings (e.g., PNC, PSH, H chain aggregation) of biological structures via an API.
   - Display the data in a dynamic table.

2. **3D Biological Structure Visualization**
   - Utilize Molstar to render a 3D model of the biological entity (e.g., protein, antibody).
   - Represent properties and readings on the 3D model using color mapping.

3. **Interactive Exploration**
   - Include an eye icon on each row of the table to highlight specific properties on the 3D model.
   - Use a dropdown menu to switch between properties and update the 3D visualization dynamically.

---

## **Implementation Details**

### **Data Table**
- Fetch data using the third-party API and represent it in a table format.
- Table columns include:
  - **Property Name** (e.g., PNC, PSH, H chain aggregation).
  - **Readings** (e.g., AB-2103, AB-2104).
  - **Action Button**: An eye icon for interacting with the 3D model.

### **3D Visualization**
- Use Molstar for importing and visualizing the biological model.
- Highlight the selected property on the 3D model using color schemes based on the readings.
- Update the 3D model dynamically based on user selection (via eye icon or dropdown).

### **Interactions**
1. **Row Eye Button**
   - Clicking the eye button on a table row highlights the corresponding property on the 3D model.
   - Properties are represented using specific colors for better visibility.

2. **Dropdown Menu**
   - Allow users to switch between different properties.
   - Update the 3D visualization accordingly, showing the selected property.

---

## **Next Steps**
1. **Backend Integration**
   - Connect the third-party API to fetch biological properties and readings.
   - Handle data mapping and ensure consistent format for the frontend.

2. **Frontend Development**
   - Build the table component with property data and action buttons.
   - Integrate Molstar for 3D visualization.
   - Implement interactions for the eye button and dropdown menu.

3. **UI/UX Enhancements**
   - Add tooltips and labels for better user understanding.
   - Ensure responsive design for different devices.

---

## **Use Cases**
1. **Scientific Analysis**
   - Scientists can examine specific properties visually on the 3D model.

2. **Property Comparison**
   - Compare readings of different properties via color-coded highlights.

3. **Targeted Research**
   - Focus on specific areas of biological structures needing further study or experimentation.

---

## **Technical Stack**
- **Frontend:** Next.js, React.js
- **3D Visualization:** Molstar
- **API Integration:** Third-party API for fetching data

---

## **Success Metrics**
1. Accurate and visually clear representation of biological properties.
2. Smooth and intuitive interaction with the 3D model.
3. Positive feedback from scientists regarding usability and effectiveness.

---

## **Future Enhancements**
1. Enable exporting 3D visualizations as images or videos.
2. Add advanced filtering options for properties and readings.
3. Integrate machine learning models for predictive analysis based on biological properties.