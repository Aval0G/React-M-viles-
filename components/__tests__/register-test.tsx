import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Register from '../../app/register';
import { Alert } from 'react-native';
import { useRouter } from "expo-router";

// Mock de la alerta y router
jest.mock('react-native/Libraries/Alert/Alert', () => {
  return {
    alert: jest.fn(),
  };
});

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe('Register', () => {
  let router;

  beforeEach(() => {
    router = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(router);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields and button correctly', () => {
    render(<Register />);
    expect(screen.getByPlaceholderText('Nombre de usuario')).toBeTruthy();
    expect(screen.getByPlaceholderText('Email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Contraseña')).toBeTruthy();
    expect(screen.getByPlaceholderText('Confirmar Contraseña')).toBeTruthy();
    expect(screen.getByText('Registrarse')).toBeTruthy();
    expect(screen.getByText('< Volver al inicio')).toBeTruthy();
  });

  it('validates empty fields', () => {
    render(<Register />);
    const button = screen.getByText('Registrarse');
    fireEvent.press(button);
    expect(Alert.alert).toHaveBeenCalledWith('Registro incorrecto', 'Los campos no pueden estar vacíos');
  });

  it('validates username length', () => {
    render(<Register />);
    fireEvent.changeText(screen.getByPlaceholderText('Nombre de usuario'), 'abc');
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'Password1!');
    fireEvent.changeText(screen.getByPlaceholderText('Confirmar Contraseña'), 'Password1!');
    fireEvent.press(screen.getByText('Registrarse'));
    expect(Alert.alert).toHaveBeenCalledWith('Registro incorrecto', 'El nombre de usuario debe tener al menos 4 caracteres');
  });

  it('validates password length', () => {
    render(<Register />);
    fireEvent.changeText(screen.getByPlaceholderText('Nombre de usuario'), 'usuario');
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'Abc1!');
    fireEvent.changeText(screen.getByPlaceholderText('Confirmar Contraseña'), 'Abc1!');
    fireEvent.press(screen.getByText('Registrarse'));
    expect(Alert.alert).toHaveBeenCalledWith('Registro incorrecto', 'La contraseña debe tener al menos 8 caracteres');
  });

  it('validates password uppercase', () => {
    render(<Register />);
    fireEvent.changeText(screen.getByPlaceholderText('Nombre de usuario'), 'usuario');
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'password1!');
    fireEvent.changeText(screen.getByPlaceholderText('Confirmar Contraseña'), 'password1!');
    fireEvent.press(screen.getByText('Registrarse'));
    expect(Alert.alert).toHaveBeenCalledWith('Registro incorrecto', 'La contraseña debe tener al menos una letra mayúscula');
  });

  it('validates password special character', () => {
    render(<Register />);
    fireEvent.changeText(screen.getByPlaceholderText('Nombre de usuario'), 'usuario');
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'Password1');
    fireEvent.changeText(screen.getByPlaceholderText('Confirmar Contraseña'), 'Password1');
    fireEvent.press(screen.getByText('Registrarse'));
    expect(Alert.alert).toHaveBeenCalledWith('Registro incorrecto', 'La contraseña debe tener al menos un caracter especial');
  });

  it('validates email format', () => {
    render(<Register />);
    fireEvent.changeText(screen.getByPlaceholderText('Nombre de usuario'), 'usuario');
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'invalid-email');
    fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'Password1!');
    fireEvent.changeText(screen.getByPlaceholderText('Confirmar Contraseña'), 'Password1!');
    fireEvent.press(screen.getByText('Registrarse'));
    expect(Alert.alert).toHaveBeenCalledWith('Registro incorrecto', 'El email no es válido');
  });

  it('validates password match', () => {
    render(<Register />);
    fireEvent.changeText(screen.getByPlaceholderText('Nombre de usuario'), 'usuario');
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'Password1!');
    fireEvent.changeText(screen.getByPlaceholderText('Confirmar Contraseña'), 'Password1Different!');
    fireEvent.press(screen.getByText('Registrarse'));
    expect(Alert.alert).toHaveBeenCalledWith('Registro incorrecto', 'Las contraseñas no coinciden');
  });

  it('successful registration navigates to home', () => {
    render(<Register />);
    fireEvent.changeText(screen.getByPlaceholderText('Nombre de usuario'), 'usuario');
    fireEvent.changeText(screen.getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(screen.getByPlaceholderText('Contraseña'), 'Password1!');
    fireEvent.changeText(screen.getByPlaceholderText('Confirmar Contraseña'), 'Password1!');
    fireEvent.press(screen.getByText('Registrarse'));
    expect(Alert.alert).toHaveBeenCalledWith('Registro exitoso', 'Ya puedes iniciar sesión');
    expect(router.push).toHaveBeenCalledWith({ pathname: "/" });
  });
});
