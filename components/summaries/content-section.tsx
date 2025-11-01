import { containerVariants, itemVariants } from "@/utils/constants";
import { MotionDiv } from "../common/motion-wrapper";

function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^-/.test(point);

  // Replace the Unicode property escape with a simpler emoji detection
  const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u2600-\u26FF]/u;
  const hasEmoji = emojiRegex.test(point);

  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

function parseEmojiPoint(content: string) {
  const cleanContent = content.replace(/[-•]\s*/, "").trim();

  const matches = cleanContent.match(/^(\p{Emoji}+)(.+)$/u);
  if (!matches) return null;

  const [, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}

const EmojiPoint = ({ point }: { point: string }) => {
  const { emoji, text } = parseEmojiPoint(point) ?? {};

  return (
    <MotionDiv
      variants={itemVariants}
      className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
    >
      <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
      <div className="relative flex items-start gap-3">
        <span className="text-lg lg:text-xl shrink-0 pt-1">{emoji}</span>
        <p className="text-lg lg:text-xl text-muted-foreground/90 leading-relaxed">
          {text}
        </p>
      </div>
    </MotionDiv>
  );
};

const RegularPoint = ({ point }: { point: string }) => {
  return (
    <MotionDiv
      variants={itemVariants}
      className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all"
    >
      <div className="absolute inset-0 bg-linear-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
      <p className=" relative text-lg lg:text-xl text-muted-foreground/90 leading-relaxed text-left">
        {point}
      </p>
    </MotionDiv>
  );
};

export default function ContentSection({
  title,
  points,
}: {
  title: string;
  points: string[];
}) {
  return (
    <MotionDiv
      variants={containerVariants}
      key={points.join("")}
      initial="hidden"
      animate="visible"
      exit={"exit"}
      className="space-y-4"
    >
      {points.map((point, index) => {
        const { isMainPoint, hasEmoji, isEmpty } = parsePoint(point);

        if (isEmpty) return null;

        if (hasEmoji || isMainPoint) {
          return <EmojiPoint point={point} key={`point-${index}`} />;
        }
        return (
          <RegularPoint point={point} key={`point-${index}`}></RegularPoint>
        );
      })}
    </MotionDiv>
  );
}
