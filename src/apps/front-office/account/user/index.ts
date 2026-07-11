import cache from "@mongez/cache";
import type { UserCacheDriverInterface, UserInterface } from "@mongez/user";
import { User as BaseUser, setCurrentUser } from "@mongez/user";

class User extends BaseUser implements UserInterface {
  /**
   * Cache driver
   */
  protected cacheDriver: UserCacheDriverInterface = cache;

  /**
   * {@inheritDoc}
   */
  public getCacheKey(): string {
    return "usr";
  }
}

const user: User = new User();

// boot the class
user.boot();

// update current user instance to be used from other packages
setCurrentUser(user);

export default user;
