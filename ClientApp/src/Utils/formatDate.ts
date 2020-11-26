import { format } from 'date-fns';

const formatDate = (date: Date, withHour: boolean = false) => {
    if (withHour) {
        return format(date, 'dd-MM-yyyy HH:mm');
    }
    return format(date, 'dd-MM-yyyy');
};

export default formatDate;