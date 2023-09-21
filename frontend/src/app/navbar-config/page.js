import NavbarConfig from '@/Components/NavbarConfig/NavbarConfig';
import { CurrentUser, Title } from '@/Components/UI';
import { authOptions } from '@/utils/authOptions';
import { getData } from '@/utils/basicURL';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
export const metadata = {
  title: "Navbar Config page",
};

const fetchData = async () => {
  const adminMails = await getData("admin-mails");

  return adminMails
}

async function page() {
  const adminMails = await fetchData();
  const session = await getServerSession(authOptions);

  const isAdmin = adminMails.find(
    (mail) => mail.email === session?.user?.email
  );

  if (!isAdmin) {
    redirect("/api/auth/signin");
  }
  return (
    <section className='pt-3'>
      <div className='container'>
        <CurrentUser />
        <Title text='Navbar Config Page' />
        <NavbarConfig />
      </div>
    </section>

  )
}

export default page; 