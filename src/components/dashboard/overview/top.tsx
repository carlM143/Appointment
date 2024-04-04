'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

export function Top(): React.JSX.Element {
    const currentDate = new Date();
    const [currentDateState, setCurrentDateState] = React.useState(currentDate);
    const [openModal, setOpenModal] = React.useState(false);
   
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDateState.toLocaleDateString(undefined, options);

    const monthOptions: Intl.DateTimeFormatOptions = { month: 'long' };
    const currentMonth = currentDateState.toLocaleDateString(undefined, monthOptions);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handlePreviousMonth = () => {
        const previousMonth = new Date(currentDateState.getFullYear(), currentDateState.getMonth() - 1, 1);
        setCurrentDateState(previousMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(currentDateState.getFullYear(), currentDateState.getMonth() + 1, 1);
        setCurrentDateState(nextMonth);
    };

    const isToday = () => {
        const today = new Date();
        return (
            currentDateState.getDate() === today.getDate() &&
            currentDateState.getMonth() === today.getMonth() &&
            currentDateState.getFullYear() === today.getFullYear()
        );
    };

    return (
        <div style={{ color: 'gray' }}>
            Appointments
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <strong>{currentMonth}</strong>
                <Box
                    component="img"
                    src="/assets/previous.png"
                    sx={{
                        height: '30px',
                        ml: 1,
                        cursor: 'pointer',
                        '&:hover': { filter: 'brightness(0.8)' },
                    }}
                    onClick={handlePreviousMonth}
                />
                <Box
                    component="img"
                    src="/assets/next.png"
                    sx={{
                        height: '30px',
                        ml: 1,
                        cursor: 'pointer',
                        '&:hover': { filter: 'brightness(0.8)' },
                    }}
                    onClick={handleNextMonth}
                />
                <Box sx={{ flex: 1, height: '30px', ml: 1 }}>
                    <Button
                        variant="contained"
                        sx={{
                            width: '30%',
                            height: '60%',
                            padding: '16px 20px',
                            gap: '10px',
                            borderRadius: '1rem',
                            float: 'right',
                            backgroundColor: '#FF630B'
                        }}
                        onClick={handleOpenModal}
                    >
                        New Appointment
                    </Button>
                </Box>
            </Box>
            {isToday() ? <span>Today is {formattedDate}</span> : <span>{formattedDate}</span>}

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <h3 id="modal-modal-title">Sample Popup Appointment Details</h3>
                    <p id="modal-modal-description">Sample Add appointment details here...</p>

                </Box>
            </Modal>
        </div>
    );
}

export default Top;
