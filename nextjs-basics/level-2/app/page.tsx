"use client";

import React, { useState } from "react";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [username, setUsername] = useState("");
  const [greeting, setGreeting] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGreeting(`Hello ${username}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col lg:flex-row">
        <section className="bale flex h-screen w-full flex-col justify-between p-9 lg:h-40">
          <Wrapper>
            <Form onSubmit={handleSubmit}>
              <Input
                label="Name"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Button>Greet</Button>
            </Form>
            {greeting && (
              <Card
                title="Welcome!"
                subtitle="Thanks for joining us"
                onClose={() => setGreeting("")}
                autoClose={true}
                duration={5000}
              >
                <p className="text-lg">{greeting}</p>
              </Card>
            )}
          </Wrapper>
        </section>
      </main>
      <Footer />
    </div>
  );
}