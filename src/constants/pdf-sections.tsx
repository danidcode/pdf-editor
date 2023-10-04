import { PDFSection } from "../interfaces/pdf-section";

export const PDFSections: PDFSection[] = [
    {
        type: 'header',
        title: 'Header',
        allowedElements: ['image'],

    },
    {
        type: 'body',
        title: 'Body',
        allowedElements: ['text', 'image', 'table'],
        forbiddenDestinations: ['footer']

    },
    {
        type: 'footer',
        title: 'Footer',
        allowedElements: ['text'],
        forbiddenDestinations: ['body']
    },


]
