import {
	ChangeEmailBodyInput,
	ChangePasswordBodyInput,
	DeleteBusinessParamsInput,
	ForgotPasswordBodyInput,
	LoginBodyInput,
	ResetPasswordBodyInput,
	SignupBodyInput,
} from '../handlers/types'

export type SignupServiceInput = SignupBodyInput
export type SignupServiceOutput = { token: string }

export type LoginServiceInput = LoginBodyInput
export type LoginServiceOutput = { token: string }

export type ForgotPasswordServiceInput = ForgotPasswordBodyInput
export type ForgotPasswordServiceOutput = { message: string }

export type ResetPasswordServiceInput = ResetPasswordBodyInput
export type ResetPasswordServiceOutput = { message: string }

export type ChangePasswordServiceInput = ChangePasswordBodyInput
export type ChangePasswordServiceOutput = { message: string }

export type ChangeEmailServiceInput = ChangeEmailBodyInput
export type ChangeEmailServiceOutput = { message: string; token: string }

export type DeleteBusinessServiceInput = DeleteBusinessParamsInput
export type DeleteBusinessServiceOutput = { message: string }
