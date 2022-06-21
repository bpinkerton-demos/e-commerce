import {render} from '@testing-library/react'
import AppNavbar from "../components/AppNavbar";
import {Session} from "next-auth";

jest.mock("next-auth/react", () => {
    const originalModule = jest.requireActual('next-auth/react');
    const mockSession: Session = {
        expires: "1",
        user: { email: "test@test.com", name: "Test", image: "test.png" },
    };
    return {
        _esModule: true,
        ...originalModule,
        useSession: jest.fn(() =>{
            return {data: mockSession, status: 'authenticated'}
        })
    }
})


it('Renders navbar', () => {
    const {container} = render(<AppNavbar/>)
    expect(container).toMatchSnapshot()
})