import { z } from 'zod'

// Signup
export const signupBodySchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
})
export type SignupBodyInput = z.infer<typeof signupBodySchema>

// Login
export const loginBodySchema = z.object({
	email: z.string().email(),
	password: z.string(),
})
export type LoginBodyInput = z.infer<typeof loginBodySchema>

// Forgot Password
export const forgotPasswordBodySchema = z.object({
	email: z.string().email(),
})
export type ForgotPasswordBodyInput = z.infer<typeof forgotPasswordBodySchema>

// Reset Password
export const resetPasswordBodySchema = z.object({
	token: z.string(),
	newPassword: z.string().min(6),
	id: z.string(),
})
export type ResetPasswordBodyInput = z.infer<typeof resetPasswordBodySchema>

// Change Password
export const changePasswordBodySchema = z.object({
	currentPassword: z.string(),
	newPassword: z.string().min(6),
})
export type ChangePasswordBodyInput = z.infer<typeof changePasswordBodySchema>

// Change Email
export const changeEmailBodySchema = z.object({
	newEmail: z.string().email(),
	password: z.string(),
})
export type ChangeEmailBodyInput = z.infer<typeof changeEmailBodySchema>

// Delete Business
export const deleteBusinessParamsSchema = z.object({
	id: z.string(),
})
export type DeleteBusinessParamsInput = z.infer<typeof deleteBusinessParamsSchema>
