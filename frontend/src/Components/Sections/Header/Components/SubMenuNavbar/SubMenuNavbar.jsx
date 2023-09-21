'use client'

import useScrollHandler from "@/Hooks/useScrollHandler";
import React, { useState } from "react";
import { Navbar, Nav, Container, Button, NavDropdown, Dropdown } from "react-bootstrap";
import { FaBars } from 'react-icons/fa';
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import useFetchData from "@/Hooks/useFetchData";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";


function SubMenuNavbar() {
    const [activeSection, setActiveSection] = useState('mainHeader');
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const pageLang = searchParams.get('lang') ?? 'ar';
    const { data: navbarTabs } = useFetchData(`tabs?lang=${pageLang}`);

    console.log(pageLang)

    const router = useRouter();

    const getSectionId = (index) => {
        const sections = document.querySelectorAll('section');
        return sections[index].id;
    };

    useScrollHandler({ setActiveSection, getSectionId });

    const handleLanguageChange = (e) => {
        const lang = e.target.value;

        // Append or update the lang query parameter and redirect
        const newUrl = pathname === '/' ? `${pathname}page/home?lang=${lang}` : `${pathname}?lang=${lang}`;

        router.push(newUrl);
    }

    return (
        <Navbar fixed="top" expand="lg" variant="dark" className="scrolled navbar-zindex ">
            <Container>
                {/* Site Logo */}
                <Navbar.Brand href="#" className="d-flex align-items-center mr-0">
                    <Link href={'/'}>
                      <Image src={'/Horizontal Version.png'} alt="logo" width={200} height={70} className="object-fit-cover " />
                    </Link>
                </Navbar.Brand>
                {/* Dropdown Button */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='border-0 text-mode'>
                    <FaBars />
                </Navbar.Toggle>
                {/* Navigation Links */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto mr-auto flex justify-content-center align-items-center">
                        {navbarTabs && navbarTabs.map(tab => (
                            <Dropdown key={tab.id}>
                                <Dropdown.Toggle className="custom-dropdown" id="dropdown-basic">
                                    {tab.localizedName[0].name}  <IoIosArrowDown />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {tab.pages.map((page, index) => (
                                        <Dropdown.Item key={index} href={`/page/${page.pageUrlName}?lang=${pageLang}`}>{page.name}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        ))}
                    </Nav>
                    <select className="select-lang" onChange={handleLanguageChange} value={pageLang}>
                        <option value="ar">ar</option>
                        <option value="en">en</option>
                    </select>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default SubMenuNavbar