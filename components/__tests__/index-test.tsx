import * as React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import Index from '../../app/index';
import { Alert } from 'react-native';

// Fire event: dar click en el botón
// Render: renderizar el componente
// Screen: acceder a los elementos del componente


//Mock the alert module

jest.mock('react-native/Libraries/Alert/Alert', () => {
    return {
        alert: jest.fn()
    }});

describe('Index', () => {
it('render correctly', () => {
    render(<Index />);
    expect(screen.getByPlaceholderText('Email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Contraseña')).toBeTruthy();
    expect(screen.getByText("Iniciar Sesión")).toBeTruthy();
    expect(screen.getByText("Registrarse")).toBeTruthy();
    expect(screen.getByTestId("icon-image")).toBeTruthy();
    });

it('validates email', () => {
    render(<Index />);
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Contraseña');
    const button = screen.getByText('Iniciar Sesión');
    fireEvent.changeText(passwordInput, 'Contraseñacorrec12');
    fireEvent.changeText(emailInput, 'juanpedro');
    fireEvent.press(button);
    expect(Alert.alert).toHaveBeenCalledWith('Inicio de sesión incorrecto', 'El email no es válido');
    });

it('validates password', () => {
    render(<Index />);
    const passwordInput = screen.getByPlaceholderText('Contraseña');
    const emailInput = screen.getByPlaceholderText('Email');
    const button = screen.getByText('Iniciar Sesión');
    fireEvent.changeText(passwordInput, 'passord');
    fireEvent.changeText(emailInput, 'juanpedro@gmail.com');
    fireEvent.press(button);
    expect(Alert.alert).toHaveBeenCalledWith('Inicio de sesión incorrecto', 'La contraseña debe tener al menos 8 caracteres');
    });
});