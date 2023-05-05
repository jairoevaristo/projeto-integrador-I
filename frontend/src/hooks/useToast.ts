import { toast } from 'react-toastify';

export const useToast = () => {
    
    const handleToast = (message = 'Houve um erro, tente novamente') => {
        toast.info(message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            icon: false,
        });
    }

    return {
        handleToast
    }
}