const isClientSide = typeof window !== 'undefined';

export default function redirectMiddleware() {
  return next => action => {
    const redirectUrl = action.payload?.redirectUrl;
    const target = action.payload?.target;
    if (redirectUrl && isClientSide) {
      if (target) {
        window.open(redirectUrl, target);
      } else {
        window.location.href = redirectUrl;
      }
      return undefined;
    }

    return next(action);
  };
}
