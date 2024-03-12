import axios from 'axios';
import { Form } from '@/pages/contact';

export const fetchForm = async (data: Form) => {
    try {
        const response = await axios.post('/api/contact', data, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        return response;
    } catch (error) {
        console.error('Form 전송 실패 : ', error);
        throw error;
    }
}