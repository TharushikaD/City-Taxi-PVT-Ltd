import Swal from 'sweetalert2';

const Alert = ({ title, message, showYesNo, onConfirm,icon }) => {
  const showAlert = () => {
    const options = {
      title,
      text: message,
      icon:icon,
      showCancelButton: showYesNo,
      confirmButtonText: showYesNo ? 'Yes' : 'Close',
      cancelButtonText: showYesNo ? 'No' : undefined,
    };

    Swal.fire(options).then((result) => {
      if (result.isConfirmed) {
        if (onConfirm) onConfirm(); 
      }
    });
  };

  showAlert(); 
  return null; 
};

export default Alert;
