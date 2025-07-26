// Email notification system
// In a production environment, you would use services like:
// - SendGrid
// - AWS SES
// - Mailgun
// - Nodemailer with SMTP

class EmailService {
  constructor() {
    this.fromEmail = process.env.FROM_EMAIL || 'noreply@legaladvisor.com'
    this.fromName = process.env.FROM_NAME || 'Legal Property Advisor'
  }

  async sendEmail(to, subject, htmlContent, textContent = null) {
    try {
      // In a real implementation, you would use an email service
      // For now, we'll simulate email sending
      console.log('📧 Email sent:', {
        to,
        subject,
        from: this.fromEmail,
        timestamp: new Date().toISOString()
      })

      // Simulate email service delay
      await new Promise(resolve => setTimeout(resolve, 100))

      return {
        success: true,
        messageId: `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }
    } catch (error) {
      console.error('Email sending failed:', error)
      throw new Error('Failed to send email')
    }
  }

  async sendWelcomeEmail(user) {
    const subject = 'Welcome to Legal Property Advisor!'
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to Legal Property Advisor!</h2>
        <p>Hello ${user.firstName},</p>
        <p>Thank you for joining Legal Property Advisor! We're excited to help you with your property legal needs.</p>
        <p>Here's what you can do with our platform:</p>
        <ul>
          <li>Get instant AI-powered legal guidance</li>
          <li>Connect with verified property lawyers</li>
          <li>Manage your legal documents securely</li>
          <li>Track your cases and consultations</li>
        </ul>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The Legal Property Advisor Team</p>
      </div>
    `

    return this.sendEmail(user.email, subject, htmlContent)
  }

  async sendBookingConfirmation(booking, user, lawyer) {
    const subject = 'Booking Confirmation - Legal Property Advisor'
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Booking Confirmation</h2>
        <p>Hello ${user.firstName},</p>
        <p>Your booking with ${lawyer.firstName} ${lawyer.lastName} has been confirmed!</p>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Booking Details:</h3>
          <p><strong>Lawyer:</strong> ${lawyer.firstName} ${lawyer.lastName}</p>
          <p><strong>Specialization:</strong> ${lawyer.specialization}</p>
          <p><strong>Access Duration:</strong> 48 hours</p>
          <p><strong>Status:</strong> Confirmed</p>
        </div>
        <p>You now have 48-hour access to chat and video consultations with your lawyer.</p>
        <p>Best regards,<br>The Legal Property Advisor Team</p>
      </div>
    `

    return this.sendEmail(user.email, subject, htmlContent)
  }

  async sendNewMessageNotification(user, senderName, messagePreview) {
    const subject = `New message from ${senderName}`
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Message</h2>
        <p>Hello ${user.firstName},</p>
        <p>You have received a new message from ${senderName}.</p>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Message Preview:</strong></p>
          <p style="font-style: italic;">"${messagePreview}"</p>
        </div>
        <p>Log in to your dashboard to view the full message and respond.</p>
        <p>Best regards,<br>The Legal Property Advisor Team</p>
      </div>
    `

    return this.sendEmail(user.email, subject, htmlContent)
  }

  async sendCaseUpdateNotification(user, caseTitle, status) {
    const subject = `Case Update: ${caseTitle}`
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Case Update</h2>
        <p>Hello ${user.firstName},</p>
        <p>Your case "${caseTitle}" has been updated.</p>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Case:</strong> ${caseTitle}</p>
          <p><strong>New Status:</strong> ${status}</p>
        </div>
        <p>Log in to your dashboard to view the full details.</p>
        <p>Best regards,<br>The Legal Property Advisor Team</p>
      </div>
    `

    return this.sendEmail(user.email, subject, htmlContent)
  }

  async sendReviewNotification(lawyer, clientName, rating) {
    const subject = `New Review Received`
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Review</h2>
        <p>Hello ${lawyer.firstName},</p>
        <p>You have received a new review from ${clientName}.</p>
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Client:</strong> ${clientName}</p>
          <p><strong>Rating:</strong> ${rating}/5 stars</p>
        </div>
        <p>Log in to your dashboard to view the full review.</p>
        <p>Best regards,<br>The Legal Property Advisor Team</p>
      </div>
    `

    return this.sendEmail(lawyer.email, subject, htmlContent)
  }

  async sendPasswordResetEmail(user, resetToken) {
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${resetToken}`
    const subject = 'Password Reset Request'
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Password Reset Request</h2>
        <p>Hello ${user.firstName},</p>
        <p>We received a request to reset your password for your Legal Property Advisor account.</p>
        <p>Click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If you didn't request this password reset, you can safely ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
        <p>Best regards,<br>The Legal Property Advisor Team</p>
      </div>
    `

    return this.sendEmail(user.email, subject, htmlContent)
  }

  async sendLawyerVerificationEmail(lawyer) {
    const subject = 'Lawyer Verification Request Received'
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Verification Request Received</h2>
        <p>Hello ${lawyer.firstName},</p>
        <p>Thank you for submitting your lawyer verification request to Legal Property Advisor.</p>
        <p>Our admin team will review your application and get back to you within 24-48 hours.</p>
        <p>You will receive an email notification once your verification is complete.</p>
        <p>Best regards,<br>The Legal Property Advisor Team</p>
      </div>
    `

    return this.sendEmail(lawyer.email, subject, htmlContent)
  }

  async sendLawyerVerificationApproved(lawyer) {
    const subject = 'Lawyer Verification Approved!'
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #10b981;">Verification Approved!</h2>
        <p>Hello ${lawyer.firstName},</p>
        <p>Congratulations! Your lawyer verification has been approved.</p>
        <p>You can now start accepting clients and providing legal consultations through our platform.</p>
        <p>Log in to your dashboard to set up your profile and start receiving booking requests.</p>
        <p>Best regards,<br>The Legal Property Advisor Team</p>
      </div>
    `

    return this.sendEmail(lawyer.email, subject, htmlContent)
  }

  async sendLawyerVerificationRejected(lawyer, reason = '') {
    const subject = 'Lawyer Verification Update'
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ef4444;">Verification Update</h2>
        <p>Hello ${lawyer.firstName},</p>
        <p>We regret to inform you that your lawyer verification request could not be approved at this time.</p>
        ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ''}
        <p>If you believe this is an error or would like to provide additional information, please contact our support team.</p>
        <p>Best regards,<br>The Legal Property Advisor Team</p>
      </div>
    `

    return this.sendEmail(lawyer.email, subject, htmlContent)
  }
}

export const emailService = new EmailService() 