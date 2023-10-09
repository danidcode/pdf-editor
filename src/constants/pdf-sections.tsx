import { PDFSection } from "../interfaces/pdf-section";

export const PDFSections: PDFSection[] = [
    {
        type: 'header',
        title: 'Header',
        allowedItems: ['image'],

    },
    {
        type: 'body',
        title: 'Body',
        allowedItems: ['text', 'image', 'table'],
        forbiddenDestinations: ['footer']

    },
    {
        type: 'footer',
        title: 'Footer',
        allowedItems: ['text'],
        forbiddenDestinations: ['body']
    },


]
