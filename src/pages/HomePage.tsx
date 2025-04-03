
import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, MessageSquare, Search, Headset, TicketCheck, Clock } from "lucide-react";

const HomePage = () => {
  return (
    <Layout>
      <section className="relative bg-gradient-to-b from-white to-blue-50 overflow-hidden py-16 md:py-24">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Easy Support Ticketing for Everyone
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Submit, track, and resolve support issues effortlessly with our intuitive ticketing system. Get the help you need, when you need it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/create-ticket">
                  <Button size="lg" className="text-base px-8">
                    <TicketCheck className="mr-2 h-5 w-5" />
                    Submit a Ticket
                  </Button>
                </Link>
                <Link to="/knowledge-base">
                  <Button variant="outline" size="lg" className="text-base px-8">
                    <Search className="mr-2 h-5 w-5" />
                    Browse Knowledge Base
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Customer Support Team" 
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our ticketing system is designed to make getting support as seamless as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Submit</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Fill out our simple ticket form with your issue details and submit it to our support team.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Track</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Monitor your ticket status in real-time and stay updated on progress through your dashboard.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Resolve</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Get your issues solved by our expert support team and rate your experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose HelpDesk InSight</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform is built with both users and support teams in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <Headset className="h-5 w-5 text-primary mr-2" />
                  <CardTitle className="text-xl">User-Friendly Interface</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Clean design and intuitive workflows make submitting and tracking tickets effortless for users of all technical levels.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center mb-2">
                  <Search className="h-5 w-5 text-primary mr-2" />
                  <CardTitle className="text-xl">Knowledge Base</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Access a comprehensive library of articles to find solutions to common problems without creating a ticket.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 text-center">
            <Link to="/register">
              <Button size="lg" className="text-base px-8">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
