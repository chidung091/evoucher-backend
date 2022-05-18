import Role from '../../users/role.enum'

export interface TokenPayload {
  email: string
  role: Role
}
