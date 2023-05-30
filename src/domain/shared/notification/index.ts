export interface NotificationErrorProps {
  message: string
  context: string
}

export class Notification {
  private readonly errors: NotificationErrorProps[] = []

  getErrors (): NotificationErrorProps[] {
    return this.errors
  }

  addError (error: NotificationErrorProps): void {
    this.errors.push(error)
  }

  messages (context?: string): string {
    if (!context) {
      return this.errors.map(error => `${error.context}: ${error.message}`).join(', ')
    }

    const messages = this.errors
      .filter(error => error.context === context)
      .map(error => `${error.context}: ${error.message}`)
    return messages.join(', ')
  }

  hasErrors (): boolean {
    return this.errors.length > 0
  }
}
