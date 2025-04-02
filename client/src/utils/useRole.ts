    import Auth from './auth';

    const useRole = (): 'engineer' | 'technician' | null => {
    if (!Auth.loggedIn()) return null;

    const { data } = Auth.getProfile();
    return data?.role || null;
    };

    export default useRole;
