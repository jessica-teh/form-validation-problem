import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import Form from "../components/Form";

describe('Form component', () => {
    it('should render Form component and its inputs sucessfully', () => {
        render(<Form/>);
        const headerElement = screen.getByText('Fill out this awesome form');
        expect(headerElement).toBeInTheDocument();
        expect(screen.getByTestId('email')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toBeInTheDocument();
        expect(screen.getByTestId('colour')).toBeInTheDocument();
        expect(screen.getByTestId('bear-checkbox')).toBeInTheDocument();
        expect(screen.getByTestId('tiger-checkbox')).toBeInTheDocument();
        expect(screen.getByTestId('snake-checkbox')).toBeInTheDocument();
        expect(screen.getByTestId('donkey-checkbox')).toBeInTheDocument();
        expect(getSubmitButton()).toBeInTheDocument();
    });

    it('should render the conditional tiger type element if the tiger has been selected as one of the animals', async () => {
        render(<Form/>);
        const tigerCheckElement = screen.getByLabelText(/tiger/i);
        await userEvent.click(tigerCheckElement);
        expect(screen.getByTestId('tiger_type')).toBeInTheDocument();
    });
})

describe('Form validation and error handling', () => {
    it('should show an error message when the entered email is not a valid email address', async () => {
        render(<Form />);
        const emailInputElement = screen.getByLabelText(/email/i)
        userEvent.type(emailInputElement, 'incompleteemail');
        await userEvent.click(getSubmitButton());
        const emailErrorElement = screen.getByText('Please enter a valid email address.');
        expect(emailErrorElement).toBeInTheDocument();
    });

    it('should show an error message when the entered password is less than 8 chars', async () => {
        render(<Form />);
        const passwordInputElement = screen.getByLabelText(/password/i);
        userEvent.type(passwordInputElement, 'abcdefg');
        await userEvent.click(getSubmitButton());
        const emailErrorElement = screen.getByText('Please enter a password longer than 7 characters.');
        expect(emailErrorElement).toBeInTheDocument();
    });

    it('should show an error message when a colour has not been selected', async () => {
        render(<Form />);
        await userEvent.click(getSubmitButton());
        const emailErrorElement = screen.getByText('Please select a colour.');
        expect(emailErrorElement).toBeInTheDocument();
    });


    it('should show an error message when less than two animals have been selected', async () => {
        render(<Form />);
        const snakeCheckElement = screen.getByLabelText(/snake/i);
        await userEvent.click(snakeCheckElement);
        await userEvent.click(getSubmitButton());
        const emailErrorElement = screen.getByText('Please select at least 2 animals.');
        expect(emailErrorElement).toBeInTheDocument();
    });

    it('should show an error message when tiger has been selected as an animal but no type of tiger is entered', async () => {
        render(<Form />);
        const snakeCheckElement = screen.getByLabelText(/snake/i);
        await userEvent.click(snakeCheckElement);
        const tigerCheckElement = screen.getByLabelText(/tiger/i);
        await userEvent.click(tigerCheckElement);
        await userEvent.click(getSubmitButton());
        const emailErrorElement = screen.getByText('Please enter a type of tiger.');
        expect(emailErrorElement).toBeInTheDocument();
    });
})

function getSubmitButton() {
    return screen.getByTestId('submit-button');
}