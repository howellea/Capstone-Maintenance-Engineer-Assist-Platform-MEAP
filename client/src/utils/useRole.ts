    import Auth from './auth';

    const useRole = (): 'engineer' | 'technician' | null => {
    if (!Auth.loggedIn()) return null;

    const user = Auth.getProfile();
    return user?.role || null;
    };

    export default useRole;
