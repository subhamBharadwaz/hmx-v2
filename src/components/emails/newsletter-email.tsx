import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

interface NewsLetterEmailProps {
  firstName?: string
  fromEmail: string
}

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://hmx.subhambharadwaz.in"

export default function NewsLetterEmail({
  firstName = "there",
  fromEmail,
}: NewsLetterEmailProps) {
  const previewText = `Welcome to HMX - Get Ready for Ultimate Comfort!`

  return (
    <Html>
      <Head>
        <title>HMX Welcome Email</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto bg-zinc-50 font-sans">
          <Container className="mx-auto my-[40px] max-w-2xl rounded p-4">
            <Text className="-mt-3 text-center text-3xl font-bold text-cyan-600">
              HMX
            </Text>

            <Section className="mt-4">
              <Heading className="text-center text-2xl font-semibold text-blue-600">
                Welcome to Ultimate Comfort: Your Jogger Pants Paradise!🌟
              </Heading>
              <Hr className="my-4" />

              <Text className="mt-6 text-base">Dear {firstName},</Text>
              <Text className="mt-6 text-base">
                We are thrilled to welcome you to HMX, your new destination for
                the most stylish and comfortable jogger pants on the market! 🎉
              </Text>

              <Text className="mt-6 text-base">
                At HMX, we understand that comfort is key, and we&apos;re here
                to provide you with an unparalleled shopping experience that
                combines fashion, functionality, and affordability. Whether
                you&apos;re a fitness enthusiast, a trendsetter, or simply
                looking for versatile loungewear, we&apos;ve got something
                special just for you.
              </Text>

              <Img
                src="https://subham-hmx.s3.amazonaws.com/banner.webp"
                alt="HMX"
                height={424}
                className="mt-10 aspect-video w-full object-cover"
              />
            </Section>

            <Section className="mt-4">
              <Text className="mt-6 text-base">
                Here&apos;s a sneak peek of what you can expect from us:
              </Text>

              <Text className="mt-6 text-base">
                👖 Wide Variety: Explore our extensive collection of jogger
                pants, designed to suit every style and occasion. From classic
                monochromatic joggers to vibrant and trendy patterns, we&apos;ve
                got it all.
              </Text>

              <Text className="mt-6 text-base">
                🛍️ Easy Shopping: Our user-friendly website ensures a seamless
                shopping experience. Browse, select, and checkout in just a few
                clicks, all from the comfort of your home.
              </Text>

              <Text className="mt-6 text-base">
                🚚 Fast Delivery: We know you can&apos;t wait to slip into your
                new joggers. That&apos;s why we offer speedy delivery to your
                doorstep, so you can enjoy your purchase in no time.
              </Text>

              <Text className="mt-6 text-base">
                🌟 Quality Assurance: We take pride in offering high-quality
                jogger pants that are not only stylish but also built to last.
                Your satisfaction is our top priority.
              </Text>

              <Text className="my-6 text-base">
                Ready to upgrade your wardrobe with the comfiest jogger pants in
                town? Click below to start shopping now:
              </Text>

              <Button href={`${baseUrl}/products`}>Shop Now!</Button>

              <Text className="mt-6 text-base">
                Thank you for choosing HMX as your go-to destination for jogger
                pants. We can&apos;t wait to be a part of your style journey!
              </Text>

              <Text className="mt-6 text-base">Stay comfy and stylish,</Text>
              <Link
                href={`mailto:${fromEmail}`}
                className="text-blue-500 underline"
              >
                {fromEmail}
              </Link>
            </Section>

            <Section className="mt-4">
              <Text className="text-base">Subham Bharadwaz</Text>
              <Text className="-mt-2 text-base">Founder, HMX</Text>
              <Link
                className="-mt-2 text-base"
                href="https://hmx.subhambharadwaz.in"
              >
                HMX
              </Link>
            </Section>

            <Section className="mt-4 text-center text-zinc-400">
              <Text className="my-4">
                P.S. Don&apos;t forget to follow us on social media to stay
                updated on the latest trends, promotions, and more!
              </Text>
              <Text className="mb-0 mt-4">
                @ HMX {new Date().getFullYear()}
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
