import { sign } from 'jws';
import fetch from 'node-fetch';

export class Signer {
  private privateKey: string;

  constructor(privateKey: string) {
    this.privateKey = privateKey;
  }

  sign(userInfo: UserInfo): string {
    return sign({
      header: {
        alg: 'HS512',
        typ: 'JWT',
      },
      payload: {
        iss: userInfo.siteId,
        sub: userInfo.userId,
        iat: Math.floor(Date.now() / 1000),
        name: userInfo.name || '',
        email: userInfo.email || '',
        avatar: userInfo.avatar || '',
      },
      secret: this.privateKey,
    });
  }

  async getUserSubscription(userId: string): Promise<SubscriptionInfo | undefined> {
    let response = await fetch(`https://sponsor-api.nitropay.com/v1/users/${userId}/subscription`, {
      method: 'GET',
      headers: {
        'Authorization': this.privateKey,
      },
    });

    let body: Promise<SubscriptionInfo>;
    try {
      body = await response.json() as Promise<SubscriptionInfo>;

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return body;
    } catch (ex) { }
  }
}

export interface UserInfo {
  siteId: string;
  userId: string;
  name?: string;
  email?: string;
  avatar?: string;
}

export interface SubscriptionInfo {
  tier: {
    id: number;
    name: string;
    description: string;
    benefits: {
      id: number;
      name: string;
      description: string;
    }[];
    order: number;
  };
  status: string;
  subscribedUntil: string;
}
