import logo from '../logo.svg'

const Header = () => {
    return (
        <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-20">
            <img
            className="w-40 px-8 py-4 bg-gradient-to-b from-black"
                src={logo}
                alt="logo"
            />
        </div>
    );
}
export default Header;