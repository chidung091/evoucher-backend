import { Request } from 'express'
import { Users } from '../../users/entity/users.entity'
import Role from '../../users/role.enum'
interface RequestWithUser extends Request {
  user: Users
  token: string
  role: Role
}
export default RequestWithUser
