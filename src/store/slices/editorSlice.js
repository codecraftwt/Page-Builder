// store/editorSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageData: {
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
    email: '',
    phone: '',
    heroImage: '',
    fontFamily: 'Arial, sans-serif',
    colors: {
      primary: '#3b82f6',
      secondary: '#6b7280',
      tertiary: '#9ca3af',
      bg: '#ffffff',
      text: '#1f2937',
      heading: '#1f2937',
    },
    titleFontSize: '48px',
    descriptionFontSize: '20px',
    headingFontSize: '32px',
    bodyFontSize: '16px',
    buttonBorderRadius: '8px',
    cardBorderRadius: '8px',
    textAlign: 'center',
    bgGradientEnabled: false,
    bgGradientStart: '#ffffff',
    bgGradientEnd: '#f8fafc',
    features: [],
    testimonials: [],
    aboutTitle: '',
    aboutDescription: '',
    mission: '',
    vision: '',
    contactTitle: '',
    address: '',
    contactPhone: '',
    contactEmail: '',
    linkedin: '',
    twitter: '',
    github: '',
    gallery: [],
    faq: [],
    pricing: [],
    sectionOrder: ['basic', 'features', 'testimonials', 'about', 'contact'],
  },
  selectedField: null, 
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    updatePageData: (state, action) => {
      state.pageData = { ...state.pageData, ...action.payload };
    },
    setPageData: (state, action) => {
      state.pageData = action.payload;
    },
    reorderSections: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const newOrder = [...state.pageData.sectionOrder];
      const [removed] = newOrder.splice(sourceIndex, 1);
      newOrder.splice(destinationIndex, 0, removed);
      state.pageData.sectionOrder = newOrder;
    },
    removeSection: (state, action) => {
      state.pageData.sectionOrder = state.pageData.sectionOrder.filter(id => id !== action.payload);
    },
    setSelectedField: (state, action) => {
      state.selectedField = action.payload; 
    },
    clearSelectedField: (state) => {
      state.selectedField = null;
    },
  },
});

export const { 
  updatePageData, 
  setPageData, 
  reorderSections, 
  removeSection,
  setSelectedField,
  clearSelectedField 
} = editorSlice.actions;

export default editorSlice.reducer;