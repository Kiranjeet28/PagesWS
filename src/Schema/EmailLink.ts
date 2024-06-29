import { z } from 'zod';

export const userEmail = z
    .string()
    .email({ message: 'Please enter a valid email address.' })
    .nonempty({ message: 'Email address cannot be empty.' });

export const UserWebLink = z
    .string()
    .url({ message: 'Please enter a valid website URL.' })
    .nonempty({ message: 'Website URL cannot be empty.' });



