import React, { useState } from 'react';
import Form from '@/components/Form';
import Input from '@/components/Input';
import Card from '@/components/Card';
import { Button } from "@/components/ui/button"

const Home: React.FC = () => {
  const [username, setUsername] = useState('');
  const [greeting, setGreeting] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGreeting(`Hello ${username}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
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
    </div>
  );
};

export default Home;